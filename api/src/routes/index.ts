import { Router, Request, Response } from "express";
import { user } from "../../db";
import { movies } from "../../db";
import axios from "axios";
import { Op } from "sequelize";
import { User } from "./types";
const router = Router();

// Perfeccionar register
// Login Bcript
// RegexString ALLmovies


router.post("/users", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  try {
    const usuario = await user.create({
      username, 
      email,
      password 
    });

    return res.json({ msg: `User create succesfully`, user: usuario });
  } catch (error) {
    return res.json({ msg: `Error 404 -${error}` });
  }
});


router.get("/allMovies", async (req: Request, res: Response) => {
  try {
    const moviess = await movies.findAll();
    console.log(moviess);
    
    return res.json({ msg: "statusTrue ", movies: moviess });

  } catch (error) {
    
    return res.json({ msg: `Error 404 -${error}` });
  }
});

// Login Post
router.post("/Login", async (req: Request, res: Response) => { 
  try {
    const { email, password } = req.body;
    const usuario = await user.findOne({ where: { email: `${email}` } });
    
    if (!usuario) return res.json({ msg: 'User not found',success: false });

    //  const checkPassword = await compare(password, usuario.password);
    if (usuario.dataValues.password !== password) return res.json({ msg: 'Password Invalid',success: false });

    if (usuario) {
      const finallyData: User =  {
        username : usuario.dataValues.username, 
        email: usuario.dataValues.email
      }
      res.status(200).send({
        data: finallyData,
        success: true,
      });
    }
    
    // if (!checkPassword) {
    //   return res.json({ msg: 'Invalid password', success: false, });
    // }
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
        gender: "Trending"
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
  let moviesQuery
  const regex_FullText = /^([a-zA-Z ]+)/i;


  try {
    if (name) {
      if (name === "") {
        moviesQuery= await movies.findAll()
        res.status(200).json({
          status: true,
          result: moviesQuery
        });
      } else {
        if (typeof name == "string") {

          moviesQuery= await movies.findAll({
            where: {
                title: { [Op.iLike]: `%${name}%` },
            }})

          if (moviesQuery.length == 0) {
            res.status(500).json({
              status: false,
              msg: `No se encontro ninguna pelicula llamada ${name}`,
              errorCode: 12
            })

          } else {
            res.status(200).json({
              status: true,
              result: moviesQuery
            });
          }
        } else {
          res.status(500).json({
            status: false,
            msg: `Formato de busqueda invalido`,
            errorCode: 14
          });
        }
      }
    } else {
      moviesQuery = await movies.findAll()
      res.status(200).json({
        status: true,
        result: moviesQuery
      });
    }


  } catch (error) {
    res.status(400).json({
      status: false,
      msg: `Entro al catch, ${error}`,
      errorCode: 400
    });
  }
})