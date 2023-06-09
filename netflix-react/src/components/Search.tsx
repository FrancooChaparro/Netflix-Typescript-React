import { useEffect, useState } from "react";
import styles from "../stylesheets/Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { movieName } from "../redux/reducer";
import { MovieObject } from "../types";
import { getMovieName, MovieFilter } from "../redux/actions";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export const Search = () => {
  let movie: Array<MovieObject> | [] = useSelector(movieName); 
  const [load, setLoad] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [countrie, setCountrie] = useState<string>("");
  const [nameTitle, setnameTitle] = useState<string>("Peliculas");
  const navigate = useNavigate();

  const countrieName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCountrie(e.target.value);
  };

  const FilterMovie = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1300);
    const retorno = MovieFilter(e.currentTarget.value);
    setnameTitle(e.currentTarget.value);
    dispatch(retorno);
  };

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    const fetchData = async () => {
      const MovieNAME = await getMovieName(countrie.trim());
      dispatch(MovieNAME);
    };
    fetchData();
    setTimeout(() => {
      setLoad(false);
    }, 1000);
    setCountrie("");
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoad(true);
      handleSearch(e);
      setnameTitle("Peliculas");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const moviesAction = await getMovieName(countrie.trim());
        dispatch(moviesAction);
      };
      fetchData();
      setLoad(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  function linktag(id: any) {
    navigate("/Details/" + id);
  }

  return (
    <div className={styles.containerAll}>
      <div className={styles.containerNavbar}>
        <div className={styles.containerIcons}>
          <Link to={"/"}>
            <MdOutlineWorkspacePremium className={styles.icon} />
          </Link>
          <Link to={"/"}>
            <AiOutlineHome className={styles.icon} />
          </Link>
        </div>
      </div>
      <div className={styles.containerLeft}>
        <div className={styles.containerInput}>
          <input
            name="Enter"
            onKeyPress={(e) => handleEnter(e)}
            className={styles.SearchBar}
            value={countrie}
            onChange={countrieName}
            type="text"
            placeholder="Search Movie"
          />
        </div>
        <div className={styles.containerBtn}>
          <button value={"Comedy"} onClick={FilterMovie}>
            Comedia
          </button>
          <button value={"TV"} onClick={FilterMovie}>
            TV Programas
          </button>
          <button value={"Music"} onClick={FilterMovie}>
            Music
          </button>
          <button value={"Terror"} onClick={FilterMovie}>
            Terror
          </button>
        </div>
      </div>
      <div className={styles.containerRight}>
        <h1>{nameTitle}</h1>


        
        <div className={styles.movieContainer}>
  {load ? (
    <div className={styles.center}>
      <div className={styles.spinner}></div>
    </div>
  ) : movie.length > 0 ? (
    <div className={styles.imageContainer}>
      {movie.slice(0, 12).map((movie: MovieObject, index) => (
        <img
          onClick={() => linktag(movie.id)}
          key={index}
          src={movie.image}
          className={styles.imgBackground}
          alt={movie.id}
        />
      ))}
    </div>
  ) : (
    <h3>No se encontraron resultados</h3>
  )}
</div>

        {/* <div className={styles.movieContainer}>
          {load ? (
            <div className={styles.center}>
              <div className={styles.spinner}></div>
            </div>
          ) : movie.length > 0 ? (
            movie
              .map((movie: MovieObject, index) => {
                return (
                  <img
                    onClick={() => linktag(movie.id)}
                    key={index}
                    src={movie.image}
                    className={styles.imgBackground}
                    alt={movie.id}
                  />
                );
              })
              .slice(0, 12)
          ) : (
            <h3>No se encontro resultados</h3>
          )}
        </div> */}
      </div>
    </div>
  );
};
