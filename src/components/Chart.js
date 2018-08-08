import React, { Component } from 'react';
import './../App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const xScale = scaleLinear()
         .domain([0, 1])
         .range([0, this.props.size[1]])

   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .style('fill', '#303030')
      .attr('x', 10)
      .attr('y', (d,i) => i * 26)
      .attr('width', d => xScale(d))
      .attr('height', 25);

   select(node)
      .selectAll('text')
      .data(this.props.data)
      .enter()
      .append('text')

   select(node)
      .selectAll('text')
      .style('fill', (d) => {
      	if (d < .25) {
      		return 'black';
      	} else {
      		return 'white'
      	}
      })
      .attr('x', (d) => {
      	if (d < .25) {
      		return xScale(d) + 12;
      	} else {
      		return 14
      	}
      })
      .attr('y', (d,i) => {
      	return (i * 26) + 15;
      })
      .attr('font-family','National')
      .attr('font-size', 12)
      .attr('font-weight', 300)
      .text((d) => {
      	return (Math.round(d*100)) + '%';
      })
   }
render() {
      return <svg ref={node => this.node = node}
      width={100} height={54}>
      </svg>
   }
}
export default BarChart