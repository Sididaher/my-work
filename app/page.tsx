"use client"

import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/database.types"
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"
import Navbar from "./components/Navbar";

type Student = Database['public']['Tables']['students']['Row']
type StudentInsert = Database['public']['Tables']['students']['Insert']
type StudentUpdate = Database['public']['Tables']['students']['Update']
type StudentUpsert = Partial<StudentUpdate> & StudentInsert


export default function Home() {

  const [students, setStudents] = useState<Student[]>([])
  const [form, setForm] = useState<StudentUpsert>({
    name: "",
    email: "",
    phone_number: "",
    gender: "male"
  })

  const [editId, setEditId] = useState<number | null>(null)

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...')
        const { error } = await supabase.from('students').select('count', { count: 'exact', head: true })
        if (error) {
          console.error('Connection test failed:', error)
          toast.error('Database connection failed. Please check your Supabase settings.')
        } else {
          console.log('Connection successful!')
        }
      } catch (err) {
        console.error('Connection test error:', err)
      }
    }

    testConnection()
    fetchStudents()
  }, [])
  //Handle Form Submit

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(form)

    if (editId) {
      // Update
      const { error } = await supabase
        .from("students")
        .update({
          name: form.name!,
          email: form.email!,
          phone_number: form.phone_number!,
          gender: form.gender!
        })
        .eq("id", editId)

      if (error) {
        if (error.message?.includes('row-level security') || error.code === 'PGRST301') {
          toast.error('Database access denied. Please check QUICK-FIX.md for setup instructions.')
        } else {
          toast.error(`Failed to update: ${error.message}`)
        }
      } else {
        toast.success("Student updated successfully!")
        setEditId(null)
        setForm({
          name: "",
          email: "",
          phone_number: "",
          gender: "male"
        })
      }
    } else {
      //Add
      const { error } = await supabase.from("students").insert({
        name: form.name!,
        email: form.email!,
        phone_number: form.phone_number,
        gender: form.gender
      })

      if (error) {
        if (error.message?.includes('row-level security') || error.code === 'PGRST301') {
          toast.error('Database access denied. Please check QUICK-FIX.md for setup instructions.')
        } else {
          toast.error(`Failed to create: ${error.message}`)
        }
      } else {
        toast.success("Student added successfully")
      }

      setForm({
        name: "",
        email: "",
        phone_number: "",
        gender: "male"
      })
    }

    fetchStudents()

  }

  // Fetch Students Data
  async function fetchStudents() {
    try {
      console.log('=== Fetching Students ===')
      console.log('Supabase client:', supabase ? 'Initialized' : 'NOT initialized')

      const { data, error, status, statusText } = await supabase.from("students").select("*")

      console.log('Response status:', status)
      console.log('Response statusText:', statusText)
      console.log('Response data:', data)
      console.log('Response error:', error)

      if (error) {
        console.error('=== Error fetching students ===')
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)
        console.error('Error details:', error.details)
        console.error('Error hint:', error.hint)
        console.error('Full error object:', JSON.stringify(error, null, 2))

        // Check if it's an RLS policy error
        if (error.message?.includes('row-level security') || error.code === 'PGRST301') {
          toast.error('Database access denied. Please run the SQL setup script in Supabase. See QUICK-FIX.md or SETUP-INSTRUCTIONS.md for help.')
        } else {
          toast.error(`Failed to fetch students: ${error.message || 'Unknown error'}`)
        }
      } else {
        console.log('=== Successfully fetched students ===')
        console.log('Number of students:', data?.length || 0)
        console.log('Students data:', data)
        setStudents(data || [])
        if (data && data.length > 0) {
          toast.success(`Loaded ${data.length} student(s)`)
        }
      }
    } catch (err) {
      console.error('=== Unexpected error fetching students ===')
      console.error('Error type:', typeof err)
      console.error('Error:', err)
      console.error('Error stack:', err instanceof Error ? err.stack : 'No stack')
      toast.error('Failed to connect to database. Please check your connection.')
    }
  }
  // Handle student edit
  function handleStudentEdit(student: Student) {
    setForm({
      name: student.name,
      email: student.email,
      phone_number: student.phone_number,
      gender: student.gender
    })
    if (student.id) {
      setEditId(Number(student.id))
    }
  }
  // Handle Student Delete
  async function handleStudentDelete(id?: number | string) {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })

    if (result.isConfirmed) {
      const numericId = Number(id)
      const { error } = await supabase.from("students").delete().eq("id", numericId)

      if (error) {
        if (error.message?.includes('row-level security') || error.code === 'PGRST301') {
          toast.error('Database access denied. Please check QUICK-FIX.md for setup instructions.')
        } else {
          toast.error(`Failed to delete: ${error.message}`)
        }
      } else {
        toast.success("Student deleted sucessfully")
        fetchStudents()
      }

    }
  }




  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '10px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="page-header">
        <div className="container">
          <h1>Student Management</h1>
          <p>Manage your students efficiently with our modern dashboard</p>
        </div>
      </div>

      <div className="container my-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card fade-in">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5'}}>
                  {editId ? (
                    <>
                      <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Update Student
                    </>
                  ) : (
                    <>
                      <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="8.5" cy="7" r="4"/>
                        <line x1="20" y1="8" x2="20" y2="14"/>
                        <line x1="23" y1="11" x2="17" y2="11"/>
                      </svg>
                      Add New Student
                    </>
                  )}
                </h5>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) => setForm({
                        ...form,
                        name: event.target.value
                      })}
                      className="form-control"
                      placeholder="Enter student name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({
                        ...form,
                        email: event.target.value
                      })}
                      className="form-control"
                      placeholder="student@example.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      value={form.phone_number}
                      onChange={(event) => setForm({
                        ...form,
                        phone_number: event.target.value
                      })}
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={form.gender}
                      onChange={(event) => setForm({
                        ...form,
                        gender: event.target.value
                      })}
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {editId ? (
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-success flex-fill">
                        <svg className="d-inline-block me-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary flex-fill"
                        onClick={() => {
                          setEditId(null);
                          setForm({
                            name: "",
                            email: "",
                            phone_number: "",
                            gender: "male"
                          });
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button type="submit" className="btn btn-primary w-100">
                      <svg className="d-inline-block me-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Student
                    </button>
                  )}
                </form>
              </div>
            </div>

            <div className="card mt-4 fade-in" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
              <div className="card-body text-center">
                <h3 style={{fontSize: '2.5rem', fontWeight: '700'}}>{students.length}</h3>
                <p className="mb-0" style={{fontSize: '1rem', opacity: 0.95}}>Total Students</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card fade-in">
              <div className="card-body">
                <h5 className="card-title mb-4" style={{fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5'}}>
                  <svg className="d-inline-block me-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Students List
                </h5>
                {students.length === 0 ? (
                  <div className="text-center py-5">
                    <svg className="mx-auto mb-3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <h5 style={{color: '#94a3b8'}}>No students yet</h5>
                    <p style={{color: '#cbd5e1'}}>Add your first student to get started</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th style={{width: '180px'}}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((singleStudent) => (
                          <tr key={singleStudent.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    fontWeight: '600'
                                  }}>
                                  {singleStudent.name?.charAt(0).toUpperCase()}
                                </div>
                                <strong>{singleStudent.name}</strong>
                              </div>
                            </td>
                            <td>{singleStudent.email}</td>
                            <td>{singleStudent.phone_number}</td>
                            <td>
                              <span className={`badge ${singleStudent.gender === 'male' ? 'bg-primary' : 'bg-success'}`}
                                style={{padding: '0.5rem 0.75rem', borderRadius: '6px'}}>
                                {singleStudent.gender}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleStudentEdit(singleStudent)}
                                title="Edit student"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleStudentDelete(singleStudent.id)}
                                title="Delete student"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"/>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
