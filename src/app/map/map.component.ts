import { Component, OnInit, 
	     ViewChild, ElementRef,
	     AfterViewInit, Input,
	     OnChanges } from '@angular/core';
const d3 = require('d3');
const topojson = require('topojson');

@Component({
	selector: 'app-map',
	template: `
	<div #container
	class="container"></div>
	`,
	styles: [`
	.container {
		padding-left: 35%;
		padding-top: 0%;
	}
	`]
})

export class MapComponent implements OnInit, AfterViewInit, OnChanges {

	@Input() gb_json: any;
    @Input() properties_json: any;

	@ViewChild('container') container: ElementRef;
	host: any;
    svg: SVGElement;
    pointers: SVGElement;
    margin: any;
    width: number;
    height: number;
    xScale: any;
    yScale: any;
    xAxis: any;
    yAxis: any;
    htmlElement: HTMLElement;
    topology: any;
    albersProjection: any;
    geoPath: any;

	constructor() {}

	ngOnInit() {
		this.width = 500,
        this.height = 880;
        this.topology = this.gb_json; 

        this.albersProjection = d3.geoAlbers()
								 .scale(3440)
								 .rotate([0, 0])
								 .center([-3, 51.5])
								 .translate([ this.width/2, this.height/2]);

		this.geoPath = d3.geoPath()
					    .projection(this.albersProjection)
					    .pointRadius(function(d: any) {
					      return 4;
					    });
	}

	ngAfterViewInit() {

		this.htmlElement = this.getNativeElement(this.container);
		this.host = d3.select(this.htmlElement);
		this.setup();
        this.buildSVG();				
	}

	ngOnChanges() {

		if(!this.host) return;
		this.buildPointers(this.geoPath);
	}

	//Helpers

	getNativeElement(element: ElementRef): HTMLElement {
		return element.nativeElement;
	}

	setup() {
		this.margin = { top: 20, right: 20, left: 40, bottom: 40 };
    	this.width = 750 - this.margin.left - this.margin.right;
    	this.height = (this.width * 0.8) - this.margin.top - this.margin.bottom;
	}

	buildSVG() {

		this.host.html('');

		this.svg = this.host
					   .append("svg")
					   		.attr("width", this.width)
					    	.attr("height", this.height)
					   //Call responsivefy
					   .call(this.responsivefy)	
					   .append("g")
					   		.selectAll( "path" )
		 					.data(topojson.feature(this.topology, this.topology.objects.tracts).features)
		 			   .enter()
		 					.append("path")
		   				 	.attr( "fill", "#9FA8DA")
		    				.attr( "d", this.geoPath);
		    		   
		this.buildPointers(this.geoPath);	                  
	}

	buildPointers(geoPath: any) {

		if (this.properties_json === null) return;

		if(this.pointers) {
			this.pointers.remove();	
		}
		

		this.pointers = this.host
		                  .select("svg")
						  .append("g")
		                  	.selectAll("path")
		                  	.data(this.properties_json.features)
		                  	.enter()
								.append( "path" )
								.attr( "fill", "#5E1E5B")
								.attr( "stroke", "#5E1E5B")
								.attr( "d", geoPath);
	}

	responsivefy(svg: any) {
		
		var margin = { top: 20, right: 20, left: 40, bottom: 40 };
		var container = d3.select(svg.node().parentNode);

		var width = parseInt(svg.style('width'));

		var height = parseInt(svg.style('height'));
		var aspect = width / height;

		svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
		   .attr('preserveAspectRatio', 'xMinYMid')
		   .call(resize);

		d3.select(window).on('resize.' + container.attr('id'), resize);

		//Helper
		function resize() {
			var targetWidth = parseInt(container.style('width'));
			svg.attr('width', targetWidth);
			svg.attr('height', Math.round(targetWidth/aspect));
		}	
	}
}