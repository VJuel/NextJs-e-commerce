"use client"
import styled from "styled-components"
import Link from "next/link"

const ButtonContainerProduct = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  //background-color: transparent;
  border: 1px solid rgb(229 231 235);
  color: ${({ theme }) => theme.primary};
  width: fit-content;
  height: auto;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bolder;

  &:hover {
    background-color: rgb(229 231 235);
    span {
      color: ${({ theme }) => theme.secondary};
    }
  }
`
const BtnReadMore = ({ productId }) => {
  return (
    <ButtonContainerProduct>
      <Link href={`/homepage/products/${productId}`}>Readme more</Link>
    </ButtonContainerProduct>
  )
}

export default BtnReadMore
