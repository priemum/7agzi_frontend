import React from "react";
import styled from "styled-components";

const UpdatePhotos = ({
	employeeProfile,
	handleImageRemovePersonalPhotos,
	handleImageRemoveWorkingPhotos,
	FileUploadWork,
	setEmployeeProfile,
}) => {
	return (
		<UpdatePhotosWrapper>
			<div className='row' style={{textAlign: "center"}}>
				<div className='col-md-10 mx-auto my-3'>
					{employeeProfile.workPhotos &&
						employeeProfile.workPhotos.map((image) => {
							return (
								<React.Fragment key={image.public_id}>
									<img
										src={image.url}
										alt='Img Not Found'
										style={{
											width: "80px",
											height: "80px",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
										className='col-md-3 m-1 '
									/>
									<button
										type='button'
										onClick={() => {
											handleImageRemoveWorkingPhotos(image.public_id);
											var array = employeeProfile.workPhotos.filter(function (
												s
											) {
												return s !== image;
											});
											setEmployeeProfile({
												...employeeProfile,
												workPhotos: array,
											});
										}}
										style={{
											transform: "translate(-70%, -85%)",
											color: "white",
											background: "darkgray",
											fontSize: "17px",
											borderRadius: "15px",
										}}
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
								</React.Fragment>
							);
						})}
					<div className='my-3'>{FileUploadWork()}</div>
				</div>
				<div className='col-md-10 mx-auto my-3'>
					{employeeProfile.personalPhotos &&
						employeeProfile.personalPhotos.map((image) => {
							return (
								<React.Fragment key={image.public_id}>
									<img
										src={image.url}
										alt='Img Not Found'
										style={{
											width: "80px",
											height: "80px",
											boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
										}}
										className='col-md-3 m-1 '
									/>
									<button
										type='button'
										onClick={() => {
											handleImageRemovePersonalPhotos(image.public_id);
											var array = employeeProfile.personalPhotos.filter(
												function (s) {
													return s !== image;
												}
											);
											setEmployeeProfile({
												...employeeProfile,
												personalPhotos: array,
											});
										}}
										style={{
											transform: "translate(-70%, -85%)",
											color: "white",
											background: "darkgray",
											fontSize: "17px",
											borderRadius: "15px",
										}}
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
								</React.Fragment>
							);
						})}
					{/* <div className='mt-3'>{FileUploadPersonal()}</div> */}
				</div>
			</div>
		</UpdatePhotosWrapper>
	);
};

export default UpdatePhotos;

const UpdatePhotosWrapper = styled.div``;
