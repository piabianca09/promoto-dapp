import React from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
// const types = ['Singer','Painter', 'Musician', 'Sculptures', 'Photography', 'Architecture', 'Fashion Design', 'Crafts', 'Interior Design', 'Dancer']

const RegisterArtist = props => (
    <Form>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="username" className="mr-sm-2">Username</Label>
            <Input type="text" name="username" id="username" onChange={props.handleInput} value={props.values.username}/>
        </FormGroup>
        {/* <FormGroup>
            <Label for="artistType">Type</Label>
            <Input type="select" name="artistType" id="artistType" onChange={props.handleInput} value={props.values.artistType}>
                {
                    types.map((t, i) => <option key={i}>{t}</option>)
                }
            </Input>
        </FormGroup> */}
        <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" className="textarea-desc" onChange={props.handleInput} value={props.values.description}/>
        </FormGroup>
        <FormGroup>
        <Label for="exampleFile">Upload picture</Label>
            <Input type="file" name="file" id="file" onChange={props.getFile}/>
        </FormGroup> 
        <FormGroup>
            <Label for="walletPassword">Wallet Password</Label>
            <Input type="password" name="walletPassword" id="walletPassword"  onChange={props.handleInput} value={props.values.walletPassword}/>
        </FormGroup>
        <hr className="my-2" />
        <Button block className="button1" onClick={props.uploadImage}>Submit</Button>
    </Form>
)

export default RegisterArtist