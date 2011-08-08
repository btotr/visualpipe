<?xml version="1.0"?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.w3.org/2000/svg" 
	xmlns:xlink="http://www.w3.org/1999/xlink">
	
	<xsl:output method="xml" 
		doctype-system="http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" 
		doctype-public="-//W3C//DTD SVG 1.1//EN" 
		indent="yes" />

	<xsl:template match="/">
		<xsl:processing-instruction name="xml-stylesheet">
			href="stylesheets/screen.css" 
			type="text/css"
		</xsl:processing-instruction>
		<svg version="1.1"
			 x="0" y="0" width="100%" height="100%" onload="new Controller()">
			<script type="application/ecmascript" xlink:href="scripts/utilities.js"/>
			<script type="application/ecmascript" xlink:href="scripts/controller.js"/>
			<script type="application/ecmascript" xlink:href="scripts/websocket.js"/>
			<defs>  
		        <g id="node" class="node endpoint">
		        	<rect rx="8" ry="8" width="80" height="28" x="0" y="0"/>    	
		            <text y="14" x="40">pipe</text>
		            <line class="connection" x1="80" y1="14" x2="120" y2="14"/>
		            <circle class="end" cx="120" cy="14" r="10">
		                <set attributeName="fill" to="#78CFE4;" begin="mousedown" end="mouseup" dur="indefinite" />
		            </circle>
		        </g>
		    </defs>
		    <g id="start" class="endpoint"  transform="translate(50,100)">
		        <circle class="start" cx="0" cy="14" r="10">
		            <animate id="startAnimation" 
							restart="whenNotActive"
							begin="indefinite" 
							end="indefinite"
		                    attributeName="r" dur="2s" values="10; 15; 10" repeatDur="indefinite" calcMode="linear" fill="remove"/>
		            <set attributeName="fill" to="#78CFE4;" begin="startAnimation.begin" end="startAnimation.end" dur="indefinite" />
		        </circle>
		        <line class="connection"  x1="10" y1="14" x2="50" y2="14"/>
		    </g>
			<foreignObject id="commands" width="100%" height="100%" y="50">
					<dl  xmlns="http://www.w3.org/1999/xhtml">
						<xsl:for-each select="commands/command">
							<dt><xsl:value-of select="@name"/></dt>
							<dd><xsl:value-of select="@description"/></dd>
							<dd> +
								<ul>
									<xsl:for-each select="option">
										<dt><xsl:value-of select="@name"/></dt>
										<dd><xsl:value-of select="@description"/></dd>
									 </xsl:for-each>
								</ul>
							</dd>
						 </xsl:for-each>
					</dl>
			</foreignObject>
		</svg>
	</xsl:template>
</xsl:stylesheet>