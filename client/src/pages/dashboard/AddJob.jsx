import {FormRow, Alert, FormRowSelect} from '../../components/index'
import {useAppContext} from "../../context/appContext";
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    console.log('create job')
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(`${name}:${value}`)
  }

  return (
      <Wrapper>
        <form className='form'>
          <h3>{isEditing ? 'edit job' : 'add job'}</h3>
          {showAlert && <Alert/>}

          <div className="form-center">
            <FormRow
                type='text'
                name='position'
                value={position}
                handleChange={handleJobInput}
            />
            <FormRow
                type='text'
                name='company'
                value={company}
                handleChange={handleJobInput}
            />
            <FormRow
                type='text'
                labelText='job location'
                name='jobLocation'
                value={jobLocation}
                handleChange={handleJobInput}
            />

            <FormRowSelect
                list={statusOptions}
                handleChange={handleJobInput}
                value={status}
                name='status'
            />

            <FormRowSelect
                list={jobTypeOptions}
                handleChange={handleJobInput}
                value={jobType}
                labelText='job type'
                name='jobType'
            />

            <div className="btn-container">
              <button
                  className="btn btn-block submit-btn"
                  type='submit'
                  onClick={handleSubmit}
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </Wrapper>
  )
}

export default AddJob