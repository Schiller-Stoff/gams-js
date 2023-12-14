// object of kind given to gamsJs?
// e.g. like: gamsJs.inject.toggableSidebar({lifecycle: ...})  ---> widget config provided by gamsJs directly?  (as JSON?)
// OR: gamsJs.inject.toggableSidebar()                         ---> widget config provided by datastream? (as e.g. XML)
export interface GamsWidget {
  lifecycle?: "develop" | "production" | "deploy";       // defaults to develop () --> message to set development mode! 
  name?: string;                                         // method call in gamsJs specifies widget name. ()
  description?: string;                                  // description for the widget.                        
  intent?: string;                                       // description of the the widget should've been used. 
  gui?: any;                                             // configuration comes always(?) from the current pid. Must be handled in gamsJs not here specifically.
  data?: any;                                            // handled by widget: arbitrary data structure  
  // not every widget needs data to work (labels)
  // of buttons etc. are nested inside "gui"
  dataSpec?: {
    // allow multiple sources and therefore merging on client side?
    sources: {
        sourceType: "api" | "local" | "gamsGMLObject" | "gamsTEIObject" | "gamsQueryObject" //not done by widget? (instead by gamsJs)??
        pid?: string;
        url?: string;
        data?: any;   //can specify any data directly here as arbitrarily.
      }[]
  };
  
}