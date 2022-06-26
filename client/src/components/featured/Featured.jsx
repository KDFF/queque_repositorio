import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Ingresos</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Ventas totales</p>
        <p className="amount">CLP 857,200</p>
        
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Meta</div>
            <div className="itemResult">
            
              <div className="resultAmount"> CLP 1,22MM</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Última semana</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">CLP 100,4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Último mes</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">CLP 300,4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
