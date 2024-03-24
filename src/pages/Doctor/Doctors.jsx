import { doctors } from "../../data/doctors";
import DoctorCard from "./DoctorCard";
import MainContentLayout from "../../layout/MainContentLayout";
import DefaultLayout from "../../layout/DefaultLayout";
const Doctors = () => {
  return (
    <>
      <DefaultLayout>
        <MainContentLayout>
          <section className="bg-[#fff9ea]">
            <div className="container text-center">
              <div>
                <h2 className="heading">Find a Doctors</h2>
                <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex item-center justify-between">
                  <input
                    type="search"
                    placeholder="Search Doctor"
                    className="py-4 pl-4 pr-2 bg-transparent w-full  focus:ouline-none cursor-pointer placeholder:text-textColor"
                  />
                  <button className="btn mt-0 rounded-[0px] rounded-r-md">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5
          "
              >
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="container">
              <div className="xl:w-[470px] mx-auto">
                <h2 className="heading text-center">What our paient say</h2>
                <p className="text_para text-center">
                  World-class care for everyone. Our health system offers unmatched,
                  expert health care
                </p>
              </div>
            </div>
          </section>
        </MainContentLayout>
      </DefaultLayout>

    </>
  );
};

export default Doctors;
