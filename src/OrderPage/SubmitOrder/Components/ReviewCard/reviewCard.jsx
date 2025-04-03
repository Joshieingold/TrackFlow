export const ReviewCard = () => {
    return (
        <div className="review-card">
            <div className="text-detail-container">
                <p>OrderID:</p>
                <p>Name</p>
                <p>Location:</p>
                <p>Waybill</p>
            </div>
            <div className="device-showcase-container">
                <h3>Devices</h3>
                <div className="device-showcase">

                </div>
                <div className="box-skid-container">
                    <p>Boxes:</p>
                    <p>Skids:</p>
                </div>
            </div>
        </div>
    )
}