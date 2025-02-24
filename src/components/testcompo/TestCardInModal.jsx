import React from 'react'
import Card from '../common/card/Card'
import Cardheader from '../common/card/Cardheader'
import CardBody from '../common/card/CardBody'

export default function TestCardInModal() {
  return (
    <Card className=" w-[300px]">
        <Cardheader> This is test card</Cardheader>
        <CardBody>this is the test body of the card which i am using for the test purpost</CardBody>
    </Card>
  )
}
