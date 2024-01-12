import { useState } from 'react';
import './css/Main.css'
import PTable from '../components/people/table';

const People = () => {

    return (
        <div className="Main People">People
            <PTable />
        </div>
    )
}

export default People;