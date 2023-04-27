import { Router, Request, Response } from "express";
import { user } from "../../db";
import { movies } from "../../db";
import axios from "axios";

const router = Router();

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

router.get("/movies", async (req: Request, res: Response) => {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "3aa2dc2d3ba567e17745ade8603cf282";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  try {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        page: 5,
      },
    });

    results.map((movie: any) => {
      movies.create({
        idi: movie.id,
        title: movie.title,
        language: movie.original_language,
        overview: movie.overview.substring(0, 245),
        image: `${URL_IMAGE + movie.poster_path}`,
        data: movie.release_date,
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

router.get("/userss", async (req: Request, res: Response) => {
  try {
    const moviess = await movies.findAll();

    return res.json({ msg: "statusTrue ", movies: moviess });

  } catch (error) {
    
    return res.json({ msg: `Error 404 -${error}` });
  }
});


router.post("/Login", async (req: Request, res: Response) => { 
  try {
    const { email, password } = req.body;
    const usuario = await user.findOne({ where: { email: `${email}` } });
    if (!usuario) return res.json({ msg: 'User not found',success: false, });

    // const checkPassword = await compare(password, usuario.password);

    if (usuario) {
      const finallya =  {
        username : usuario.dataValues.username, 
        email: usuario.dataValues.email
      }
      res.status(200).send({
        data: finallya,
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