import { useEffect, useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './components/Modal';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { MagicMotion } from "react-magic-motion";
import { Task } from './types/Task';
import { getTasks } from './services/task';
import clsx from 'clsx';
import taskService from './services/taskService';
function App() {
  const [tasks, setTasks] = useState<Task[]>([

  ]);

  const [openModalNewTask, setOpenModalNewTask] = useState(false);
  const [openModalDeleteTask, setOpenModalDeleteTask] = useState(false);

  const [task, setTask] = useState<Task | null>()

  const handleOpenModalDeleteTask = (selectTask: Task) => {
    setTask(selectTask)
    setOpenModalDeleteTask(true);
  };

  const handleCloseModalDeleteTask = () => {
    setOpenModalDeleteTask(false);
  };
  const handleOpenModalNewTask = () => {
    setOpenModalNewTask(true);
  };

  const handleCloseModalNewTask = () => {
    setOpenModalNewTask(false);
  };

  const createTask = () => {
    console.log(id)
  }

  const editTask = (e: Task) => {

    setValue('descripcion', e.descripcion);
    setValue('id', e.id);

  }

  const deleteTask = async () => {

    const response = await taskService.deleteTask(task?.id)

    handleCloseModalDeleteTask()
    getAllTask()

    setTask(null)
  }

  const handleModalupdateTask = (e: Task) => {
    console.log(e)
    editTask(e)
    setOpenModalNewTask(true);
  }

  const checkTask = async (e: Task) => {
    const task = {
      estado: true,
      fechaHoraFin: new Date()
    }
    const response = await taskService.updateTask(e.id, task)
    console.log(response)
    getAllTask()
  }

  const onSubmit = async (data: any) => {
    const newTask = {
      descripcion: data.descripcion,
      fechaHoraInicio: data.fechaHoraInicio,
    }
    if (data.id) {

      const response = await taskService.updateTask(data.id, newTask)
      console.log(response)
    } else {
      const response = await taskService.createTask(newTask)
      console.log(response)
    }

    reset()

    getAllTask()

    setOpenModalNewTask(false)
  };

  const getAllTask = async () => {
    const tasks = await taskService.getAllTasks()
    setTasks(tasks)
  }
  useEffect(() => {
    getAllTask()
  }, [])

  const getCurrentDateTime = () => {
    return dayjs().format('YYYY-MM-DDTHH:mm');
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      descripcion: "",
      id: null
    }
  });
  return (
    <div className='w-screen'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900 flex flex-col md:flex-row justify-evenly items-center">
          <div>
            <button
              onClick={() => handleOpenModalNewTask()}
              className="bg-blue-500 text-white px-4 py-2 rounded m-2"
            >
              Generar Nueva Tarea
            </button>

            <Modal isOpen={openModalDeleteTask} onClose={handleCloseModalDeleteTask}>
              <div className="relative w-full flex justify-center items-center">
                <div className="relative bg-white rounded-lg dark:bg-gray-700">
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Esta seguro que quiere Eliminar la tarea ?
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={deleteTask}
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Si estoy Seguro
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No,Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal isOpen={openModalNewTask} onClose={handleCloseModalNewTask}>
              <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full p-6 rounded shadow-md max-w-sm">
                  <h2 className="text-2xl mb-4">Formulario</h2>

                  <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                      {...register('descripcion', { required: true })}
                      className={`mt-1 p-2 w-full border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.descripcion && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700">Fecha y Hora de Inicio</label>
                    <input
                      {...register('fechaHoraInicio', { required: true })}
                      type="datetime-local"
                      defaultValue={getCurrentDateTime()}
                      className={`mt-1 p-2 w-full border ${errors.fechaHoraInicio ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.fechaHoraInicio && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                  </div>

                  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Enviar</button>
                </form>
              </div>
            </Modal>
          </div>
        </div>

        <div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <div className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 grid grid-cols-2 sm:grid-cols-7 gap-4 text-center">
            <div className="col-span-1 px-6 py-3">
              #
            </div>
            <div className="col-span-2 px-6 py-3">
              Tarea
            </div>
            <div className="col-span-1 px-6 py-3">
              Estado
            </div>
            <div className="col-span-1 px-6 py-3">
              Hora Creación
            </div>
            <div className="col-span-1 px-6 py-3">
              Hora Finalización
            </div>
            <div className="col-span-1 px-6 py-3 flex justify-center items-center">
              Acciones
            </div>
          </div>
        </div>

        <MagicMotion>
          <div className='w-full'>
            {
              tasks.map((e, index) => {
                return (
                  <div
                    key={index}
                    className={clsx('text-xs bg-white my-4 border-b dark:bg-gray-800 dark:border-gray-700 grid grid-cols-2 sm:grid-cols-7 gap-4 text-center', {
                      'bg-green-200 dark:bg-green-700': e.estado, 'bg-red-200 dark:bg-red-700': !e.estado,
                    })}
                  >
                    <div className="col-span-1 px-6 py-4">{e.id}</div>
                    <div className="col-span-2 px-6 py-4">{e.descripcion}</div>
                    <div className="col-span-1 px-6 py-4">{e.estado ? 'Terminado' : 'Por Terminar'}</div>
                    <div className="col-span-1 px-6 py-4">{dayjs(e.fechaHoraInicio).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="col-span-1 px-6 py-4">{e.fechaHoraFin && dayjs(e.fechaHoraFin).format('YYYY-MM-DD HH:mm:ss')}</div>
                    <div className="col-span-1 px-6 py-4 flex justify-center items-center">
                      <button
                        onClick={() => handleModalupdateTask(e)}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {/* Ícono de actualización */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleOpenModalDeleteTask(e)}
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        {/* Ícono de eliminación */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>

                      {!e.estado && (
                        <button
                          onClick={() => checkTask(e)}
                          type="button"
                          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                        >
                          {/* Ícono de marcado */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </MagicMotion>
      </div>
    </div>)
}

export default App
