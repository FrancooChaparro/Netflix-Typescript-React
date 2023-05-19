import { Router, Request, Response } from "express";
import { user } from "../../db";
import { movies } from "../../db";
import axios from "axios";
import { Model, Op } from "sequelize";
import { compare, encrypt } from "../helpers/bcrypt";

const router = Router();

router.post("googlepost", async (req: Request, res: Response) => { 
  try {
    const { username, email, password } = req.body;

    if (!username || !email) return res.json({ msg: 'Missing required fields', success: false  });

    await user.create({
      username: username,
      email: email,
      password: "XDRWQDFF11as555oidashjaiwdmalsdiw87888259edfa123"
    });
    return res.json({ msg: `User create succesfully`, success: true });

  } catch (error) {
     return res.json({ msg: `Error 404 - ${error}` });
  }
});


router.post("googlelogin", async (req, res) => { 
  try {
    const { email } = req.body;
    const UserExist = await user.findOne({ where: { email: `${email}` } });
    
      res.status(200).send({
        data: UserExist,
        success: true,
      });

  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
});


router.post("/users", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const regexName = /^([a-zA-Z ]+)$/i;
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const infoUser = {
    username,
    password,
  };

  try {
    if (!username || !password || !email)
      return res.json({ msg: "Missing required fields" });

    if (email && email.length > 0 && email != "") {
      if (regexEmail.test(email)) {
        const userBD = await user.findOne({ where: { email: `${email}` } });
        if (userBD) {
          return res.json({ msg: "The email already exists" });
        }
      }

      if (username && username.length > 0 && username != "") {
        if (regexName.test(username)) {
          infoUser.username = `${username}`;
        } else {
          return res.json({ msg: "The name is invalid" });
        }
      }

      if (password && password.length > 0 && password != "") {
        const passwordHash = await encrypt(password);
        infoUser.password = `${passwordHash}`;
      } else {
        return res.json({ msg: "The password is invalid" });
      }
    }

    const usuario = await user.create({
      username,
      email,
      password: infoUser.password,
    });

    return res.json({ msg: `User create succesfully`, user: usuario });
  } catch (error) {
    return res.json({ msg: `Error 404 -${error}` });
  }
});

router.get("/allMovies", async (req: Request, res: Response) => {
  try {
    const moviess = await movies.findAll();

    return res.json({ msg: "statusTrue ", movies: moviess });
  
  } catch (error) {
    return res.json({ msg: `Error 404 -${error}` });
  }
});

interface UserLog {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Login Post
router.post("/Login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usuario: UserLog | Model<any, any> | null = (await user.findOne({
      where: { email: `${email}` },
    })) as UserLog | null;

    if (!usuario) return res.json({ msg: "User not found", success: false });

    const checkPassword = await compare(password, usuario.password);

    if (checkPassword) {
        const finallyData = {
          username: usuario.username,
          email: usuario.email,
        };
        res.status(200).send({
          data: finallyData,
          success: true,
        });
      
    }
    if (!checkPassword) {
      return res.json({ msg: "Invalid password", success: false });
    }

  } catch (error) {
    return res.json({ msg: `Error 404 - ${error}` });
  }
});

export default router;

// Cargo 20 movie por click, por params puedo modificar la categoria del movie
router.get("/movies", async (req: Request, res: Response) => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "3aa2dc2d3ba567e17745ade8603cf282";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  try {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/trending/all/week`, {
      params: {
        api_key: API_KEY,
      },
    });

    results.map((movie: any) => {
      movies.create({
        idi: movie.id,
        title: movie.title ? movie.title : "Netflix Edidition",
        language: movie.original_language,
        overview: movie.overview.substring(0, 245),
        image: `${URL_IMAGE + movie.poster_path}`,
        date: movie.release_date ? movie.release_date : "2020",
        background: `${URL_IMAGE + movie.backdrop_path}`,
        gender: "Trending",
      });
    });

    return res.json({
      msg: `User create succesfully`,
      movies: "databaseLoaded",
    });
  } catch (error) {
    return res.json({ msg: `Error 404 -${error}` });
  }
});

// Ruta busco movie por query si hay, sino traigo todas las movie
router.get("/movie", async (req: Request, res: Response) => {
  const { name } = req.query;
  let moviesQuery;
  const regex_FullText = /^([a-zA-Z ]+)/i;

  try {
    if (name) {
      if (name === "") {
        moviesQuery = await movies.findAll();
        res.status(200).json({
          status: true,
          result: moviesQuery,
        });
      } else {
        if (typeof name == "string") {
          moviesQuery = await movies.findAll({
            where: {
              title: { [Op.iLike]: `%${name}%` },
            },
          });

          if (moviesQuery.length == 0) {
            res.status(201).json({
              status: false,
              msg: `No se encontro ninguna pelicula llamada ${name}`,
              errorCode: 12,
            });
          } else {
            res.status(200).json({
              status: true,
              result: moviesQuery,
            });
          }
        } else {
          res.status(404).json({
            status: false,
            msg: `Formato de busqueda invalido`,
            errorCode: 14,
          });
        }
      }
    } else {
      moviesQuery = await movies.findAll();
      res.status(200).json({
        status: true,
        result: moviesQuery,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: `Entro al catch, ${error}`,
      errorCode: 400,
    });
  }
});

router.get("/movie/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movieID = await movies.findByPk(id);

    if (movieID === null) {
      res.status(500).json({
        status: false,
        msg: `Parametro de busqueda invalido`,
        errorCode: 10,
      });
    } else {
      res.status(200).json({
        status: true,
        result: movieID,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: `Entro al catch, ${error}`,
      errorCode: 400,
    });
  }
});
