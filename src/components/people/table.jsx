import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUser, faAngleDown, faEye, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './../css/people_Table.css'
import CropPopup from '../cropper/cropper';

library.add(faCamera, faUser, faAngleDown, faEye, faPen, faCheck)

const infoTable = [
    {
        nome: 'Luiz',
        sobrenome: 'Figueredo',
        dataAdmissao: '01/04/2020',
        dataNascimento: '31/03/1982',
        photo: '',
        dep: 'Produção'
    },    
    {
        nome: 'Ana',
        sobrenome: 'Luiza',
        dataAdmissao: '01/04/2022',
        dataNascimento: '31/03/1999',
        photo: 'https://plus.unsplash.com/premium_photo-1689266188052-704d33673e69?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dep: 'Compras'
    },    
    {
        nome: 'Leticia',
        sobrenome: 'Lopez',
        dataAdmissao: '14/06/2020',
        dataNascimento: '24/05/1993',
        photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        dep: 'RH'
    }
]



const PTable = () => {

    const [inEdit, setEdit] = useState (true);
    const [EditChange, setEditChange] = useState (false);
    const [infoData, setInfoData] = useState(infoTable);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('none');

    const changeEdit = () => {
        setEdit(!inEdit);
    }

    const onSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? 'none' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortData = () => {
        if (sortDirection === 'none') {
            return infoTable;
        }

        return [...infoData].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const sortedData = sortData();

    return (
        <div className="People-Table">
        <div className='Tools'>
            <button className={`cngEdit ${inEdit ? 'Edit' : 'View'}`} onClick={changeEdit}><span>{inEdit ? (<FontAwesomeIcon icon='fa-pen'/>) : (<FontAwesomeIcon icon='fa-eye'/>)}</span></button>
            <button className={`cngSave`}><FontAwesomeIcon icon='fa-check'/></button>
            <Link className={`addPerson`} to={"/people/register"}>Adicionar Pessoa</Link>
        </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className={`${sortColumn == 'nome' ? sortDirection : ''}`} onClick={() => onSort('nome')}>
                            {sortColumn == 'nome' &&  (<FontAwesomeIcon icon='fa-angle-down'/>)}
                            Nome</th>
                        <th className={`${sortColumn == 'sobrenome' ? sortDirection : ''}`} onClick={() => onSort('sobrenome')}>
                            {sortColumn == 'sobrenome' &&  (<FontAwesomeIcon icon='fa-angle-down'/>)}
                            Sobrenome</th>
                        <th className={`${sortColumn == 'dataAdmissao' ? sortDirection : ''}`} onClick={() => onSort('dataAdmissao')}>
                            {sortColumn == 'dataAdmissao' &&  (<FontAwesomeIcon icon='fa-angle-down'/>)}
                            Data de Admissão</th>
                        <th className={`${sortColumn == 'dataNascimento' ? sortDirection : ''}`} onClick={() => onSort('dataNascimento')}>
                            {sortColumn == 'dataNascimento' && (<FontAwesomeIcon icon='fa-angle-down'/>)}
                            Data de Nascimento</th>
                        <th className={`${sortColumn == 'dep' ? sortDirection : ''}`} onClick={() => onSort('dep')}>
                            {sortColumn == 'dep' &&  (<FontAwesomeIcon icon='fa-angle-down'/>)}
                            Departamento</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr className={`tr-Person i-${index}`} >
                            <td className='td-photo'>
                                <div className={`person-icon ${!item.photo ? 'not' : ''}`}>
                                    {inEdit && <span className='icon-change'><FontAwesomeIcon icon='fa-camera' /></span>}
                                    {item.photo && <img src={item.photo} />}
                                    {!item.photo && <FontAwesomeIcon icon='fa-user'/>}
                                </div>
                            </td>
                            <td className='td-nome'>
                                {!inEdit && item.nome}
                                {inEdit && <input className='input-td nome' value={item.nome} />}
                            </td>
                            <td className='td-sobrenome'>
                                {!inEdit && item.sobrenome}
                                {inEdit && <input className='input-td sobrenome' value={item.sobrenome} />}
                            </td>
                            <td className='td-data1'>
                                {!inEdit && item.dataAdmissao}
                                {inEdit && <input className='input-td dataAdmissao' value={item.dataAdmissao} />}
                            </td>
                            <td className='td-data2'>
                                {!inEdit && item.dataNascimento}
                                {inEdit && <input className='input-td dataNascimento' value={item.dataNascimento} />}
                            </td>
                            <td className='td-dep'>
                                {!inEdit && item.dep}
                                {inEdit && <input className='input-td dep' value={item.dep} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <CropPopup foto={''}/> */}
        </div>
    )
}

export default PTable;