<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" exclude-result-prefixes="#all">
    
    <xsl:variable name="__gamsJsBasePath">/lib/3.0/gamsJS/1.x</xsl:variable>
    
    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl" id="injectTripleForm">
        <desc>Handles injection of gamsJs's Triple form. Creates a form according to given configuration object 
            that specifies the creation of an html formular. Eeach form-field is linked to an "$" subparameter inside 
            the REST "params" pathvariable.  
            Creates the required render element and handles the assignment of the javascript configuration object. 
            External Dependencies:
            - gamsJs
            - Bootstrap 4 (css only)
            - Customization via external CSS and JSON Schema.
        </desc>
        <param name="config">Configuration object for the triple form (see: )</param>
    </doc>
    <xsl:template name="injectTripleForm">
        <xsl:param required="no" name="config"/>
        <xsl:variable name="tripleFormContainerID">GAMS_WIDGET_TRIPLEFORM</xsl:variable>
        
        <!-- 01. create container element -->
        <div id="{$tripleFormContainerID}"><xsl:text> </xsl:text></div>
        
        <!-- 02. Assign global variable -->
        <script>
            window.<xsl:value-of select="$tripleFormContainerID"/> = <xsl:value-of select="$config"/>
        </script>
        
        <!-- ***** 
                03. Apply dependencies to render component 
                - css 
                - js
                ***** 
            -->
        <link href="{$__gamsJsBasePath}/TripleForm/css/tripleForm.css" rel="stylesheet"><xsl:text> </xsl:text></link>
        <script src="{$__gamsJsBasePath}/TripleForm/js/2.e65736ae.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/TripleForm/js/main.e181e5a1.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/TripleForm/js/runtime-main.74a9ef47.js" type="text/javascript"><xsl:text> </xsl:text></script>
    </xsl:template>
    
    
    
    
    
    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl" id="injectGdasMApp">
        <desc>Handles injection of gamsJs's GdasMApp. Renders the map application according to  given
            configuration object. Relies on GDAS-GeoJson. 
            Creates the required render element and handles the assignment of the javascript configuration object. 
            External Dependencies:
            - gamsJs
            - Bootstrap 4 (css only)
            - Customization via external CSS and JSON Schema.
        </desc>
        <param name="config">Configuration object for the triple form (see: )</param>
    </doc>
    <xsl:template name="injectGdasMApp">
        <xsl:param required="no" name="config"/>
        <xsl:variable name="containerID">GAMS_WIDGET_GDASMAPP</xsl:variable>
        <div id="{$containerID}"><xsl:text> </xsl:text></div>
        <script>
            window.<xsl:value-of select="$containerID"/> = <xsl:value-of select="$config"/>
        </script>
        
        <link href="{$__gamsJsBasePath}/GdasMApp/css/main.0cecb038.chunk.css" rel="stylesheet"><xsl:text> </xsl:text></link>
        <script src="{$__gamsJsBasePath}/GdasMApp/js/2.6d9ddb50.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/GdasMApp/js/main.2a470279.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/GdasMApp/js/runtime-main.74a9ef47.js" type="text/javascript"><xsl:text> </xsl:text></script>
        
        
    </xsl:template>
    
    <doc xmlns="http://www.oxygenxml.com/ns/doc/xsl" id="injectCalendar">
        <desc>Handles injection of gamsJs's ZIMCalendar. Renders the calendar application according to  given
            configuration object. Relies on specific JSON. 
            Creates the required render element and handles the assignment of the javascript configuration object. 
            External Dependencies:
            - gamsJs
            - Bootstrap 4 (css only)
            - Customization via external CSS and JSON Schema.
        </desc>
        <param name="config">Configuration object for the triple form (see: )</param>
    </doc>
    <xsl:template name="injectCalendar">
        <xsl:param required="no" name="config"/>
        <xsl:variable name="containerID">GAMS_WIDGET_CALENDAR</xsl:variable>
        <div id="{$containerID}"><xsl:text> </xsl:text></div>
        <script>
            window.<xsl:value-of select="$containerID"/> = <xsl:value-of select="$config"/>
        </script>
        <link href="{$__gamsJsBasePath}/ZimCalendar/css/2.dc08fe7a.chunk.css" rel="stylesheet"><xsl:text> </xsl:text></link>
        <script src="{$__gamsJsBasePath}/ZimCalendar/js/2.2d78af04.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/ZimCalendar/js/main.1b99e861.chunk.js" type="text/javascript"><xsl:text> </xsl:text></script>
        <script src="{$__gamsJsBasePath}/ZimCalendar/js/runtime-main.74a9ef47.js" type="text/javascript"><xsl:text> </xsl:text></script>
    </xsl:template>
    
</xsl:stylesheet>