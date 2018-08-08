import React, { Component } from 'react';
import './../App.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';

class Labels extends Component {
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
         .range([0, 39])
   select(node)
      .selectAll('text')
      .data(this.props.data)
      .enter()
      .append('text')
      .style('fill', 'black')
      .attr('x', (d)=> {
         return xScale(1.44)
      })
      .attr('y', (d,i) => {
         if (d != 'GAP SCORE') {
            return (i * 26) + 33;
         } else {
            return (i * 26) + 38;
         }
      })
      .attr('text-anchor', 'end')
      .attr('font-family','National')
      .attr('font-size', 12)
      .attr('font-weight', 300)
      .attr('text-transform', 'uppercase')
      .text((d) => {
      	return d;
      })
   }
render() {
      return <svg ref={node => this.node = node}
      width={56} height={104}>
      </svg>
   }
}

export default Labels