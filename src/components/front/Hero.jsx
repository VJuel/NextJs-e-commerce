'use client'
import {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {device} from "@/styles/abstract";
import mac from '../../assets/macbookpro.png'
import Image from "next/image";
import axios from "axios";
import BtnProduct from "@/src/components/front/button/BtnProduct";
import {BtnAddToCartPrimary} from "@/src/components/front/button/BtnAddToCart";
import {CartContext} from "@/src/components/CartContext";
// import BtnAddToCart from "../../components/front/button/BtnAddToCart";
// import BtnProduct from "../../components/front/button/BtnProduct";

const HeroWrapper = styled.section`
  background: ${({theme}) => theme.primary};
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  @media (max-width: ${device.tablet}) {
    flex-direction: column-reverse;
    padding: 20px 50px;
    background: white;
  }
`
const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh;
  width: 100%;
  height: 100%;
  padding: 20px 100px;
  @media (${device.laptop}) {
    padding: 20px 80px;

  }
  @media (${device.tablet}) {
    flex-direction: column-reverse;
    padding: 20px 50px;
  }
`

const HeroDescr = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  margin-right: 40px;
  width: 50%;
  @media (${device.tablet}) {
    width: 100%;
    margin-right: 0;
    text-align: center;
  }
`
const HeroTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({theme}) => theme.primary};
  margin-bottom: 20px;
`
const HeroText = styled.p`
  font-size: 16px;
  color: ${({theme}) => theme.primary};
  margin-bottom: 20px;
  @media (${device.tablet}) {
    padding: 0 40px;
  }
`
const HeroBtnContainer = styled.div`
  display: flex;
  justify-content: start;
  align-content: center;
  gap: 12px;
  @media (${device.tablet}) {
    width: 100%;
    justify-content: center;
  }
  @media (${device.mobileL}) {
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`


const HeroImg = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 50%;
  @media (${device.tablet}) {
    margin: 0 auto;
  }
`

export default function Hero() {
    const [features, setFeatures] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.get('api/products/features',)
            .then(res => setFeatures(res.data))
            .catch(err => console.log(err))
        setIsLoading(false)
    }, [])


    const MyHero = (props) => {
        return (
            <Image
                src={features[0]?.images[0] || mac}
                alt="macbook pro"
                style={{width: '100%', objectFit: 'contain'}}
            />
        )
    }

    return (
        <>
            {isLoading &&
                <div className="flex justify-center items-center max-w-3xl m-auto min-h-12">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"/>
                    loading
                </div>}
            {features && <HeroWrapper>
                <HeroContainer>
                    <HeroDescr>
                        <HeroTitle>{features[0].title}</HeroTitle>
                        <HeroText>{features[0].description}</HeroText>
                        <HeroBtnContainer>
                            <BtnProduct/>
                            <BtnAddToCartPrimary featureId={features[0]._id}/>
                        </HeroBtnContainer>
                    </HeroDescr>

                    <HeroImg>
                        <MyHero/>
                    </HeroImg>
                </HeroContainer>
            </HeroWrapper>}
        </>
    );
};

