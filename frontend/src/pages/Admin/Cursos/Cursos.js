import React, { useState, useEffect } from 'react';
import CoursesList from '../../../components/Admin/Courses/CoursesList/CoursesList';
import { GetCursos } from '../../../api/cursos';
import { GetCategories } from '../../../api/category';
import './Cursos.scss';

const Cursos = () => {

    const [ data, setData ] = useState();
    const [ category, setCategory ] = useState();
    const [ reloadData, setReloadData ] = useState(false);

    useEffect(() => {
        GetCursos()
            .then(response => {
                    setData(response);
            })
            GetCategories()
            .then(response => {
                setCategory(response)
            })
            setReloadData(false);
    }, [reloadData]);

    return (  
        <div className="courses">
            <CoursesList data={data} setReloadData={setReloadData} category={category} />
        </div>
    );
}

export default Cursos;