
import { GamsWidget } from "../gamsWidget";

export interface ToggableSideBar extends GamsWidget {
  name?: string;
  description?: string;
  intent?: string;
  gui?: {
    top?: Link[];
    center?: Link[];
    bottom?: Link[];
    style?: any
    switchBtn?: SearchButton
  }
}

export interface Link {
  href: string;
  htmlAttributes?: {
    className?: string;
    [property: string] : string | undefined
  }
}

export interface IconLink extends Link {
  faClass: string
}

export interface AbbrLink extends Link {
  text: string
}

export interface ImageLink extends Link {
  src: string
}

export interface SearchButton {
  text?: string
  faClass?: string
}