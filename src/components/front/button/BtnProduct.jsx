import styled from "styled-components";

const ButtonContainerProduct = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: transparent;
  border: 1px solid  rgb(229 231 235);
  color: ${({theme}) => theme.primary};
  width: fit-content;
  height: auto;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bolder;
  
  &:hover {
    background-color: rgb(229 231 235);
    span {
      color: ${({theme}) => theme.secondary};
    }
  }
 
`
const BtnProduct = () => {
    return (
        <ButtonContainerProduct>
            <span>Readme more</span>
        </ButtonContainerProduct>
    );
};

export default BtnProduct;