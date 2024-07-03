function ListingComponent() {
  return (
    <>
      <div className="ls-main-container  flex flex-row w-4/5 justify-between items-center bg-thirdColor p-4 rounded-lg">
        <div className="ls-one">
          <h2>Title</h2>
          <div className=" flex flex-row gap-10">
            <p>Company Name</p>
            <p>Location</p>
          </div>
        </div>
        <div className="ls-two">
          <h2>Date</h2>
          <p>Any Other Info</p>
        </div>
        <div className="ls-three">
          <button className="rounded-lg bg-fourthColor color-black py-2 px-4">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default ListingComponent;
