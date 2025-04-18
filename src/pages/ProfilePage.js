import { useState } from 'react';
import { Save, Camera, Upload, Download, Plus, Trash2, Edit3 } from 'lucide-react';

const ProfilePage = () =>{
  // User profile state
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    email: 'johndoe@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    photo: null,
    about: 'Experienced software engineer with a passion for building user-friendly web applications.',
    education: [
      { id: 1, institution: 'University of Technology', degree: 'Master of Computer Science', year: '2018-2022' }
    ],
    experience: [
      { id: 1, company: 'Tech Solutions Inc.', position: 'Frontend Developer', duration: '2022-Present', description: 'Developing responsive web applications using React and TypeScript.' }
    ],
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Node.js'],
    awards: [
      { id: 1, title: 'Best Developer Award', issuer: 'Tech Conference 2023', date: '2023' }
    ],
    certificates: [
      { id: 1, title: 'React Developer Certification', issuer: 'React Training Academy', date: '2022' }
    ]
  });

  // Editing states
  const [editMode, setEditMode] = useState({
    personalInfo: false,
    about: false,
    skills: false
  });
  
  // Form states for adding new items
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', year: '' });
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', description: '' });
  const [newAward, setNewAward] = useState({ title: '', issuer: '', date: '' });
  const [newCertificate, setNewCertificate] = useState({ title: '', issuer: '', date: '' });
  const [newSkill, setNewSkill] = useState('');

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({...profile, photo: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // General update handler for text fields
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setProfile({...profile, [section]: {...profile[section], [name]: value}});
  };

  // Add new education entry
  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      const newId = profile.education.length > 0 ? Math.max(...profile.education.map(item => item.id)) + 1 : 1;
      setProfile({
        ...profile,
        education: [...profile.education, {...newEducation, id: newId}]
      });
      setNewEducation({ institution: '', degree: '', year: '' });
    }
  };

  // Add new experience entry
  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      const newId = profile.experience.length > 0 ? Math.max(...profile.experience.map(item => item.id)) + 1 : 1;
      setProfile({
        ...profile,
        experience: [...profile.experience, {...newExperience, id: newId}]
      });
      setNewExperience({ company: '', position: '', duration: '', description: '' });
    }
  };

  // Add new award
  const addAward = () => {
    if (newAward.title && newAward.issuer) {
      const newId = profile.awards.length > 0 ? Math.max(...profile.awards.map(item => item.id)) + 1 : 1;
      setProfile({
        ...profile,
        awards: [...profile.awards, {...newAward, id: newId}]
      });
      setNewAward({ title: '', issuer: '', date: '' });
    }
  };

  // Add new certificate
  const addCertificate = () => {
    if (newCertificate.title && newCertificate.issuer) {
      const newId = profile.certificates.length > 0 ? Math.max(...profile.certificates.map(item => item.id)) + 1 : 1;
      setProfile({
        ...profile,
        certificates: [...profile.certificates, {...newCertificate, id: newId}]
      });
      setNewCertificate({ title: '', issuer: '', date: '' });
    }
  };

  // Add new skill
  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  // Remove item from array by id
  const removeItem = (array, id) => {
    return array.filter(item => item.id !== id);
  };

  // Remove skill by value
  const removeSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    });
  };

  // Export profile as JSON
  const exportProfile = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'profile.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="pb-20"> 
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 bg-blue-600 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">Job Profile Editor</h1>
          <p className="text-blue-100">Create and customize your professional profile</p>
        </div>

        {/* Profile Photo and Basic Info */}
        <div className="p-6 border-b flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="relative w-40 h-40 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Camera className="text-gray-400" size={48} />
              )}
            </div>
            <label className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">
              <Upload size={16} />
              Upload Photo
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>

          <div className="flex-1">
            {editMode.personalInfo ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                  <input 
                    type="text" 
                    value={profile.title} 
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input 
                      type="text" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input 
                    type="text" 
                    value={profile.location} 
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <button 
                    onClick={() => setEditMode({...editMode, personalInfo: false})}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-lg text-gray-600">{profile.title}</p>
                  </div>
                  <button 
                    onClick={() => setEditMode({...editMode, personalInfo: true})}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit3 size={20} />
                  </button>
                </div>
                <div className="mt-4 space-y-1 text-gray-600">
                  <p>{profile.email}</p>
                  <p>{profile.phone}</p>
                  <p>{profile.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About Me */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">About Me</h2>
            <button 
              onClick={() => setEditMode({...editMode, about: !editMode.about})}
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit3 size={20} />
            </button>
          </div>
          
          {editMode.about ? (
            <div>
              <textarea 
                value={profile.about} 
                onChange={(e) => setProfile({...profile, about: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border h-32"
              />
              <div className="flex justify-end mt-2">
                <button 
                  onClick={() => setEditMode({...editMode, about: false})}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">{profile.about}</p>
          )}
        </div>

        {/* Education */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          
          <div className="space-y-4 mb-6">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    education: removeItem(profile.education, edu.id)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Add Education</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Years (e.g., 2018-2022)"
                value={newEducation.year}
                onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <button
                onClick={addEducation}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add Education
              </button>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
          
          <div className="space-y-4 mb-6">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="text-gray-600">{exp.position}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    experience: removeItem(profile.experience, exp.id)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Add Experience</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2022-Present)"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <textarea
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border h-20"
              />
              <button
                onClick={addExperience}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add Experience
              </button>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <button 
              onClick={() => setEditMode({...editMode, skills: !editMode.skills})}
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit3 size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {skill}
                {editMode.skills && (
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="text-blue-500 hover:text-blue-700 ml-1"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {editMode.skills && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <button
                onClick={addSkill}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>
          )}
        </div>

        {/* Awards */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Awards & Honors</h2>
          
          <div className="space-y-4 mb-6">
            {profile.awards.map((award) => (
              <div key={award.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-semibold">{award.title}</h3>
                  <p className="text-gray-600">{award.issuer}</p>
                  <p className="text-gray-500 text-sm">{award.date}</p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    awards: removeItem(profile.awards, award.id)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Add Award</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Award Title"
                value={newAward.title}
                onChange={(e) => setNewAward({...newAward, title: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={newAward.issuer}
                onChange={(e) => setNewAward({...newAward, issuer: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Date"
                value={newAward.date}
                onChange={(e) => setNewAward({...newAward, date: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <button
                onClick={addAward}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add Award
              </button>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Certificates</h2>
          
          <div className="space-y-4 mb-6">
            {profile.certificates.map((cert) => (
              <div key={cert.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{cert.date}</p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    certificates: removeItem(profile.certificates, cert.id)
                  })}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Add Certificate</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Certificate Title"
                value={newCertificate.title}
                onChange={(e) => setNewCertificate({...newCertificate, title: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({...newCertificate, issuer: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="text"
                placeholder="Date"
                value={newCertificate.date}
                onChange={(e) => setNewCertificate({...newCertificate, date: e.target.value})}
                className="block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <button
                onClick={addCertificate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
              >
                <Plus size={16} />
                Add Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Export Profile */}
        <div className="p-6">
          <button
            onClick={exportProfile}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
          >
            <Download size={16} />
            Export Profile
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProfilePage