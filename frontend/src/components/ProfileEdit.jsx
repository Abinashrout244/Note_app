import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/UserSlice";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    about: "",
    photoURL: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        emailId: user.emailId || "",
        about: user.about || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.put(BASE_URL + "/api/auth/profile-edit", form, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));
      alert("Profile Updated Successfully ✅");
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 pt-15">
        <form
          onSubmit={handleEdit}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 space-y-5"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Edit Profile
          </h2>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="email"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="photoURL"
            value={form.photoURL}
            onChange={handleChange}
            placeholder="Profile Image URL"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            rows="3"
            placeholder="About You"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-all duration-500">
            <div className="h-28 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            <div className="flex flex-col items-center px-6 pb-8 -mt-14">
              <img
                src={form.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <h3 className="mt-4 text-2xl font-bold text-gray-800 text-center">
                {form.firstName} {form.lastName}
              </h3>

              <p className="text-sm text-gray-500 mt-1 text-center">
                {form.emailId}
              </p>

              <p className="text-center mt-4 text-gray-600 text-sm leading-relaxed px-4">
                {form.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
