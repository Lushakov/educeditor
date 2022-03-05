import { css } from "styled-components";

export const scrollbarMixin = css`
    &::-webkit-scrollbar {
        width: 6px;
        height: 100px;
    }
    &::-webkit-scrollbar-track {
        background-color:  #F2F5F9;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:  #ddd;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: #bbb;
    } 
`

export const scrollbarHideMixin = css`
    &::-webkit-scrollbar {
        width: 6px;
        height: 100px;
    }
    &::-webkit-scrollbar-track {
        background-color:  inherit;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color:  inherit;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: inherit;
    } 
`