import React from 'react'
import styled, { keyframes } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Input = (props) => {
    return (
        <InputWrapper type={props.type}>
            <InputField fail={props.failedAuthentication} required={true} 
                        placeholder={props.placeholder} value={props.value} onChange={props.onChange} 
                        type={props.hidden? "password": "text"} name={props.name}/>
            <FocusAnim fail={props.failedAuthentication} />
            {props.icon
            ?<Icon onClick={props.onIconClick} fail={props.failedAuthentication}><FontAwesomeIcon onClick={props.onIconClick} icon={props.icon}/></Icon>
            :<> </>
            }
        </InputWrapper>
        
    )
}
const animate_focus = keyframes `
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
`


const FocusAnim = styled.span`
    display: block;
    position: absolute;
    border-radius: 25px;
    bottom: 0;
    left:0;
    z-index: -1;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 0px;
    color: ${props => props.fail? "#f10707": "#0065FF"};
`


const InputWrapper = styled.div`
    position: relative;
    margin-bottom: ${props => props.margin? "15px" : "0px"};
    z-index: 1;
    width: 41%;
    min-width: 120px;
`

const InputField = styled.input`
    border-radius: 25px;
    padding:0 30px 0 60px;
    width: 100%;
    height: 30px;
    border: ${props => props.fail? "2px solid #ca0404": "none"};
    background: #E6E6E6;
    transition: all 0.5s ease-out;
    &:focus + ${FocusAnim}{
        animation: ${animate_focus} 0.5s ease-in-out forwards;
    }
    &:focus{
        outline: none;
    }
    &:focus::-webkit-input-placeholder{
        opacity: 0;
    }
`


const Icon = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #666666;
    display: flex;
    align-items:center;
    padding-left: 35px;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.4s ease-out;
    cursor: ${props => props.onIconClick?  "default": "pointer"};
    ${InputField}:focus ~ & {
        color: ${props => props.fail? "#f10707": "#0065FF"};
        transform: translateX(-10px);
    }
`


export default Input
