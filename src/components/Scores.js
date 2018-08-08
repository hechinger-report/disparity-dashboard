import React, { Component } from 'react';
import BarChart from './Chart.js';
import Labels from './Labels.js'

class Scores extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	return (
      <div className="score-wrapper">
  		<div className="score-container">
      <Labels data={['STUDENTS', 'FACULTY','GAP SCORE']} size={[200,200]}/>
  			<div className="score-container-inner">
  				<div className="score-content"><h3>Asian</h3></div>
          <BarChart data={[this.props.enrollment[0],this.props.faculty[0]]} size={[200,100]}/>
          <div className="score-box-container"> 
  				  {(this.props.coefficient[0] > 0.3) ? (
                      <div className="score-box negative">{this.props.coefficient[0]}</div>
                    ) : (
                      <div className="score-box">{this.props.coefficient[0]}</div>
              )}
          </div>
  				{this.props.coefficient[0] == 0 ? (
                  <div className="score-what-is">
                    The proportion of Asian students and Asian faculty is roughly equal 
                  </div>
                ) : (this.props.coefficient[0] < 0) ? (
                  <div className="score-what-is">
                    Asian faculty are overrepresented here compared to Asian students
                  </div>
          ) : (this.props.coefficient[0] > 0 && this.props.coefficient[0] < .5) ? (
                  <div className="score-what-is">
                    The gap between Asian students and faculty is smaller here than the national average
                  </div>
          ) : (
                  <div className="score-what-is">
                    The gap between Asian students and faculty is bigger here than the national average
                  </div>
          )}
  			</div>
  			<div className="score-container-inner">
  				<div className="score-content"><h3>Black</h3></div>
          <BarChart data={[this.props.enrollment[1],this.props.faculty[1]]} size={[200,100]}/>
          <div className="score-box-container">   
  				  {(this.props.coefficient[1] > 0.3) ? (
                      <div className="score-box negative">{this.props.coefficient[1]}</div>
                    ) : (
                      <div className="score-box">{this.props.coefficient[1]}</div>
              )}
          </div>
          {this.props.coefficient[1] == 0 ? (
                  <div className="score-what-is">
                    The proportion of black students and black faculty is roughly equal 
                  </div>
                ) : (this.props.coefficient[1] < 0) ? (
                  <div className="score-what-is">
                    Black faculty are overrepresented here compared to black students
                  </div>
          ) : (this.props.coefficient[1] > 0 && this.props.coefficient[1] < .5) ? (
                  <div className="score-what-is">
                    The gap between black students and faculty is smaller than the national average
                  </div>
          ) : (
                  <div className="score-what-is">
                    The gap between black students and faculty is bigger here than the national average
                  </div>
          )}
  			</div>
  			<div className="score-container-inner">
  				<div className="score-content"><h3>Hispanic</h3></div>
            <BarChart data={[this.props.enrollment[2],this.props.faculty[2]]} size={[200,100]}/>
          <div className="score-box-container"> 

              {(this.props.coefficient[2] > 0.3) ? (
                      <div className="score-box negative">{this.props.coefficient[2]}</div>
                    ) : (
                      <div className="score-box">{this.props.coefficient[2]}</div>
              )}
          </div>
          {this.props.coefficient[2] == 0 ? (
                  <div className="score-what-is">
                    The proportion of Hispanic students and Hispanic faculty is roughly equal 
                  </div>
                ) : (this.props.coefficient[2] < 0) ? (
                  <div className="score-what-is">
                    Hispanic faculty are overrepresented here compared to Hispanic students
                  </div>
          ) : (this.props.coefficient[2] > 0 && this.props.coefficient[2] < .5) ? (
                  <div className="score-what-is">
                    The gap between Hispanic students and faculty is smaller here than the national average
                  </div>
          ) : (
                  <div className="score-what-is">
                    The gap between Hispanic students and faculty is bigger here than the national average
                  </div>
          )}
  			</div>
  			<div className="score-container-inner">
  				<div className="score-content"><h3>White</h3></div>
          <BarChart data={[this.props.enrollment[3],this.props.faculty[3]]} size={[200,100]}/>
          <div className="score-box-container"> 
  				  {(this.props.coefficient[3] > 0.3) ? (
                      <div className="score-box negative">{this.props.coefficient[3]}</div>
                    ) : (
                      <div className="score-box">{this.props.coefficient[3]}</div>
              )}
          </div>
          {this.props.coefficient[3] == 0 ? (
                  <div className="score-what-is">
                    The proportion of white students and white faculty is roughly equal 
                  </div>
                ) : (this.props.coefficient[3] < 0) ? (
                  <div className="score-what-is">
                    White faculty are overrepresented here compared to white students
                  </div>
          ) : (this.props.coefficient[3] > 0 && this.props.coefficient[3] < .5) ? (
                  <div className="score-what-is">
                    The gap between white students and faculty is smaller here than the national average
                  </div>
          ) : (
                  <div className="score-what-is">
                    The gap between white students and faculty is bigger here than the national average
                  </div>
          )}
  			</div>
  		</div>
      {/*<div className="other">(Other races) American Indian/Alaska Native: Students—<span>{(this.props.enrollment[4]*100).toFixed(1)}%</span>, Faculty—<span>{(this.props.faculty[4]*100).toFixed(1)}%</span>;
        Native Hawaiian/Pacific Islander: Students—<span>{(this.props.enrollment[5]*100).toFixed(1)}%</span>, Faculty—<span>{(this.props.faculty[5]*100).toFixed(1)}%</span>;
        Two or more races: Students—<span>{(this.props.enrollment[6]*100).toFixed(1)}%</span>, Faculty—<span>{(this.props.faculty[6]*100).toFixed(1)}%</span>;
        Race unknown: Students—<span>{(this.props.enrollment[7]*100).toFixed(1)}%</span>, Faculty—<span>{(this.props.enrollment[7]*100).toFixed(1)}%</span>
      </div>*/}
      </div>
  		)
  }
}

export default Scores;