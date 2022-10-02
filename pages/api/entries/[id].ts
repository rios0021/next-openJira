import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models/Entry';

type Data = 
| {message: string} 
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id = ''} = req.query
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message: 'Id is not valid!'});
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntry(req, res)
        case 'DELETE':
            return deleteEntry(req, res)
        default:
            return res.status(400).json({message: 'Method does not exist'});
    }
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id = ''} = req.query
    try {
        await db.connect();
        const entryToUpdate = await Entry.findById(id);
        if (!entryToUpdate) {
            await db.disconnect();
            return res.status(400).json({message: 'No entry with such ID'})
        }
        const {status = entryToUpdate.status, description = entryToUpdate.description} = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        await db.disconnect();
        return res.status(200).json(updatedEntry!);
        
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong updating' })
    }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse) =>{
    const {id} = req.query;
    try {
        await db.connect();
        const entry = await Entry.findById(id);
        if(!entry){
            await db.disconnect();
            return res.status(400).json({message: 'No entry with such ID'});
        }
        await db.disconnect();
        return res.status(200).json(entry);
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({message: 'Something went wrong searching the request'})
    }
}
const deleteEntry = async(req: NextApiRequest, res: NextApiResponse) =>{
    const {id} = req.query
    try {
        await db.connect();
        const deletedEntry = await Entry.findByIdAndDelete(id);
        if (!deletedEntry) {
            await db.disconnect();
            return res.status(400).json({message: 'No entry with such ID'})
        }
        await db.disconnect();
        return res.status(202).json(deletedEntry);
        
    } catch (error) {
        await db.disconnect();
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong deleting' })
    }
}