import React , {Component} from 'react';
const styles={
  img:{
    minHeight:120
  }
}
class Cover extends Component{

render(){   

 return(

  
  <div id="mycarousel" className="carousel slide">
  <div className="carousel-inner" role="listbox">
    <div className="carousel-item active">
      <img style={styles.img} src="img/1.jpg" className='img-fluid' alt="img-redundant-alt"/>
      </div>
      <div className="carousel-item -caption">
      <img  style={styles.img} src="img/4.jpg" className="img-fluid" alt="img-redundant-alt"/>
      </div>
    </div>
    <ol className="carousel-indicators">
<li data-target="#mycarousel" data-slide-to="0" className="active"></li>
<li data-target="#mycarousel" data-slide-to="1" className=""></li>


</ol>
<a className="carousel-control-prev" href="#mycarousel" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#mycarousel" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
      </div>
 

 


);
}

}
export default Cover;


/*

    <div className="jumbotron">
    <div className="container">
    <img   className='img-responsive center-block' src='smart-home-2769210_1920.jpg' />
    
    </div>
  </div>
  */