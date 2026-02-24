import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { addUser } from "../utils/UserSlice";
import toast from "react-hot-toast";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [err, setErr] = useState("");

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

  const isEdited =
    form.firstName !== (user?.firstName || "") ||
    form.lastName !== (user?.lastName || "") ||
    form.emailId !== (user?.emailId || "") ||
    form.about !== (user?.about || "") ||
    form.photoURL !== (user?.photoURL || "");

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.put(BASE_URL + "/api/auth/profile-edit", form, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.user));

      toast.success("Profile Updated Successfully ");
    } catch (err) {
      //console.log(err.response?.data || err.message);
      setErr(err?.response?.data);
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
    <div className="min-h-[calc(100vh-64px)] pt-24 pb-10 md:pb-0 md:pt-16 bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* ================= FORM ================= */}
          <form
            onSubmit={handleEdit}
            className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Edit Profile
            </h2>

            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="email"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="text"
              name="photoURL"
              value={form.photoURL}
              onChange={handleChange}
              placeholder="Profile Image URL"
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              rows="3"
              placeholder="About You"
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            />

            <button
              type="submit"
              disabled={!isEdited || loading}
              className={`w-full py-3  text-white rounded-xl font-semibold shadow-lg  ${isEdited === false ? "cursor-not-allowed bg-indigo-300" : "cursor-grab bg-linear-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300"}`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {err && (
              <p className="font-semibold text-red-600">ERROR:{err?.message}</p>
            )}
          </form>

          {/* ================= PROFILE CARD ================= */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-28 sm:h-32 bg-linear-to-r from-blue-500 to-indigo-600"></div>

              <div className="flex flex-col items-center px-6 pb-8 -mt-12 sm:-mt-14">
                <img
                  src={form.photoURL || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
                />

                <h3 className="mt-3 text-xl sm:text-2xl font-bold text-gray-800 text-center">
                  {form.firstName} {form.lastName}
                </h3>

                <p className="text-sm text-gray-500 mt-1 text-center">
                  {form.emailId}
                </p>

                <p className="text-center mt-3 text-gray-600 text-sm">
                  {form.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
