import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function Graph({ datos }) {
  const canvas = useRef();

  const drawChart = (data) => {
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const uWidth = width - margin.left - margin.right;
    const uHeigth = height - margin.top - margin.bottom;

    const svg = d3
      .select(canvas.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 15]).range([uHeigth, 0]);

    const x = d3.scaleLinear().domain([0, 380]).range([0, uWidth]);

    const nodes = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        d.x = x(d.episodes) + margin.left;
        d.y = y(d.seasons) + margin.top;
        return "translate(" + d.x + "," + d.y + ")";
      });

    nodes
      .append("circle")
      .attr("r", 10)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("fill-opacity", "0.5")
      .style("fill", "orange")
      .style("stroke", "orange");

    nodes
      .append("text")
      .attr("x", 15)
      .attr("y", 5)
      .attr("text-anchor", "start")
      .text(function (d) {
        return d.name;
      });

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0,${uHeigth})`);

    g.append("g").classed("y--axis", true).call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 4)
      .text("Episodes");

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", 11)
      .attr("x", 0)
      .text("Season");
  };

  useEffect(() => {
    if (datos.length > 0) drawChart(datos);
  }, [datos]);

  return <div ref={canvas}></div>;
}

export default Graph;
