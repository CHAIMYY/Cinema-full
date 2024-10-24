import React, { useState, useEffect } from 'react';
import Sidebar from "../../Components/Sidebar";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";
import Movieform from "../../Components/Movieform"




export default function Admin() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/admin', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });

                                  console.log(response);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                  const data = await response.json(); 
                  setUsers(data);
            } catch (error) {
                console.error('Error fetching films:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading films...</p>;
    }


    return (
<>
        <Sidebar/>
        <div className="Pcontainer">
      <ul role="list" className="people-list">
        {users.map((user) => (
          <li key={user.email} className="person-item">
            <div className="person-details">
              {/* <img alt="" src={User.imageUrl} className="person-image" /> */}
              <div className="person-info">
                <p className="person-name">{user.name}</p>
                <p className="person-email">{user.email}</p>
              </div>
            </div>
            <div className="person-role-container">
              <p className="person-role">{user.role}</p>
              {user.lastSeen ? (
                <p className="last-seen">
                  Last seen <time dateTime={user.lastSeenDateTime}>{user.lastSeen}</time>
                </p>
              ) : (
                <div className="online-status">
                  <div className="status-indicator">
                    <div className="status-dot" />
                  </div>
                  <p className="online-text">Online</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      </div>
      </>
    )
  }
  