const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchCourses = async () => {
    try {
        const response = await fetch(`${BASE_URL}/courses`);
        if (!response.ok) throw new Error('Failed to fetch courses');
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
};

export const fetchCourseById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/courses/${id}`);
        if (!response.ok) throw new Error('Failed to fetch course');
        return await response.json();
    } catch (error) {
        console.error('Error fetching course:', error);
        return null;
    }
};

export const fetchFaculty = async () => {
    try {
        const response = await fetch(`${BASE_URL}/faculty`);
        if (!response.ok) throw new Error('Failed to fetch faculty');
        return await response.json();
    } catch (error) {
        console.error('Error fetching faculty:', error);
        return [];
    }
};

export const addCourse = async (courseData) => {
    try {
        const response = await fetch(`${BASE_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) throw new Error('Failed to add course');
        return await response.json();
    } catch (error) {
        console.error('Error adding course:', error);
        throw error;
    }
};

export const login = async (email, password, required_role = null) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, required_role }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed');
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await fetch(`${BASE_URL}/courses/${courseId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete course');
        return await response.json();
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};


export const signup = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');
        return data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

// Faculty Analytics & Records
export const fetchFacultyAnalytics = async () => {
    try {
        const response = await fetch(`${BASE_URL}/faculty/analytics`);
        if (!response.ok) throw new Error('Failed to fetch analytics');
        return await response.json();
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return null;
    }
};

export const fetchStudentsRegistry = async () => {
    try {
        const response = await fetch(`${BASE_URL}/students`);
        if (!response.ok) throw new Error('Failed to fetch students');
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
};

export const enrollCourse = async (enrollmentData) => {
    try {
        console.log('Enrolling with data:', enrollmentData);
        console.log('Calling URL:', `${BASE_URL}/enroll`);

        const response = await fetch(`${BASE_URL}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enrollmentData),
        });

        console.log('Response status:', response.status);

        // Try to parse JSON response
        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error('Failed to parse JSON response:', jsonError);
            throw new Error('Server returned invalid response. Please check if the backend is running.');
        }

        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(data.message || `Enrollment failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('Error enrolling in course:', error);

        // Provide more specific error messages
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to server. Please ensure the backend is running on http://localhost:5000');
        }

        throw error;
    }
};

// Admin Functions
export const updateStudent = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update student');
        return await response.json();
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
};

export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/students/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete student');
        return await response.json();
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
};

export const updateFaculty = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/faculty/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update faculty');
        return await response.json();
    } catch (error) {
        console.error('Error updating faculty:', error);
        throw error;
    }
};

export const deleteFaculty = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/faculty/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete faculty');
        return await response.json();
    } catch (error) {
        console.error('Error deleting faculty:', error);
        throw error;
    }
};


