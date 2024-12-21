import styles from "../detailPage/detailPage.module.css";
import Loading from "../../components/loading/loading";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getDriverId } from "../../redux/actions/actions";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //estado local
  const [loadings, setLoadings] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(()=>{
      setLoadings(false);
    }, 1500)

    dispatch(getDriverId(id));
    return () => clearTimeout(loadingTimeout);
  }, [dispatch, id]);

  const driver = useSelector((state) => state.detail);

  return( 
    <div>
      { loadings ?
      (<Loading />
      ): (
        <div className={styles.detailContainer}>
          <div className={styles.containerDescription}>
            <img className={styles.img} src={driver.image} alt={driver.name} />
            <h2 className={styles.h2}>Forename: {driver.forename}</h2>
            <h2 className={styles.h2}>Surname: {driver.surname}</h2>
            <p className={styles.p}>Nationality: {driver.nationality}</p>
            <p className={styles.p}>DOB: {driver.dob}</p>
            <p className={styles.p}>Description: {driver.description}</p>
            <p className={styles.p}>Teams: {driver.teams}</p>
          </div>
          <div className={styles.containerButton}>
            <button
              className={styles.enterButton}
              onClick={() => {
                navigate("/home");
              }}
            >
              Return to home
            </button>
          </div>
        </div>
      )
}
</div>
  )
}

export default DetailPage;
