import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from '../hooks/useForm'
import './home.css';
import { Card } from '../card/Card';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { getUsersByName } from '../../selectors/getUsersByName';
import { HistoricSidenav } from '../sidenav/HistoricSidenav';

export const HomeScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { name = '', pages = 1 } = queryString.parse(location.search);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [historic, setHistoric] = useState([]);
  const [page, setPage] = useState(parseInt(pages));
  const [countResult, setCountResult] = useState(0);


  const [formValues, handleInputChange] = useForm({
    searchText: name
  });

  const { searchText } = formValues;
  localStorage.setItem('lastPath', location.search)

  useMemo(() => { formValues.searchText = name; setPage(1) }, [name])


  useEffect(() => {
    async function check() {
      if (name && name.trim().length > 0) {
        setLoading(true);
        const result = await getUsersByName(name, parseInt(page));
        if (result.total_count > 0) {
          setUsers(result.items);
          setCountResult(result.total_count);
          setError(false);
        } else if (result.total_count === 0) {
          setUsers(result.items);
          setCountResult(result.total_count);
          setError(false);
        } else {
          setError(true);
        }
        setLoading(false);
      }

    }
    check();
  }, [name, parseInt(page)]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`?name=${searchText}&pages=${parseInt(page)}`)
    setHistoric([...historic, searchText]);
  }

  const handleNextPaginate = (e) => {
    e.preventDefault();
    setPage(parseInt(page) + 1);
    navigate(`?name=${searchText}&pages=${parseInt(page) + 1}`);
  }
  const handleBackPaginate = (e) => {
    e.preventDefault();
    setPage(parseInt(page) - 1);
    navigate(`?name=${searchText}&pages=${parseInt(page) - 1}`);
  }


  return (
    <>
      <div className="he grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <HistoricSidenav historic={historic} />
        </div>
        <div className="body col-span-5">
          <div className="searchInput">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar Usuario..."
                className="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"
                name="searchText"
                autoComplete="off"
                value={searchText}
                onChange={handleInputChange}
              />
            </form>
          </div>
          {
            (users.length === 0 && !loading && !error) &&
            <div role="alert" className="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                No se Encontraron usuarios
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>No se optuvo resultados.</p>
              </div>
            </div>
          }
          {
            (users.length === 0 && !loading && error) &&
            <div role="alert" className="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error en la api
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>Vuelva a intentarlo mas tarde.</p>
              </div>
            </div>
          }
          <div className="grid grid-cols-6 gap-4">
            {
              (users.length > 0 && !loading) && users.map(element => (
                <Card key={element.id}
                  {...element} />
              ))
            }
          </div>
          {
            (users.length > 0 && !loading) &&
            <div className="grid grid-cols-3 gap-4 mt-5">
              <button disabled={page === 1} className="col-end-1  p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300" onClick={handleBackPaginate}>Anterior</button>
              <div className="col-start-1 text-center col-end-6 bg-blue-100 border border-blue-400 text-black-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Resultados: {parseInt(pages) * 12 - 11} al {parseInt(pages) * 12} de {countResult} -- Pagina:{parseInt(pages)} de {Math.ceil(countResult / 12)}  </strong>
              </div>
              <button className="col-end-7 p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300" onClick={handleNextPaginate}>siguiente</button>
            </div>
          }
        </div>
      </div>
    </>
  )
}
