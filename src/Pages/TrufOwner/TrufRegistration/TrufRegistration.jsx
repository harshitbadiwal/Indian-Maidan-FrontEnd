import React, { useState } from 'react';
import styles from './TurfRegistration.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SportsTurfRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Info
    turfName: '',
    fullAddress: '',
    locationPin: '',
    contactNumber: '',
    
    // Facility Details
    turfSize: '',
    surfaceType: '',
    availableSports: [],
    isIndoor: false,
    amenities: [],
    
    // Operations
    weekdayOpeningTime: '08:00',
    weekdayClosingTime: '22:00',
    weekendOpeningTime: '08:00',
    weekendClosingTime: '22:00',
    hourlyRate: '',
    specialOffers: [{ description: '', discount: 0 }],
    cancellationPolicy: '',
    
    // Media
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (category, item) => {
    const updatedArray = formData[category].includes(item)
      ? formData[category].filter(i => i !== item)
      : [...formData[category], item];
    
    setFormData({ ...formData, [category]: updatedArray });
  };

  const handleToggleChange = (name) => {
    setFormData({ ...formData, [name]: !formData[name] });
  };

  const handleOfferChange = (index, field, value) => {
    const updatedOffers = [...formData.specialOffers];
    updatedOffers[index] = { ...updatedOffers[index], [field]: value };
    setFormData({ ...formData, specialOffers: updatedOffers });
  };

  const addOffer = () => {
    setFormData({
      ...formData,
      specialOffers: [...formData.specialOffers, { description: '', discount: 0 }]
    });
  };

  const removeOffer = (index) => {
    const updatedOffers = formData.specialOffers.filter((_, i) => i !== index);
    setFormData({ ...formData, specialOffers: updatedOffers });
  };

  const addImage = (file) => {
    if (formData.images.length < 10) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    // Here you would typically send the form data to your backend or API
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const renderProgressBar = () => {
    return (
      <div className={styles.progressContainer}>
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className={styles.stepWrapper}>
            <div 
              className={`${styles.stepIndicator} ${currentStep >= step ? styles.active : ''} ${currentStep > step ? styles.completed : ''}`}
            >
              {currentStep > step ? '✓' : step}
            </div>
            <div className={styles.stepLabel}>
              {step === 1 && 'Business Info'}
              {step === 2 && 'Facility Details'}
              {step === 3 && 'Operations'}
              {step === 4 && 'Media'}
            </div>
            {step < 4 && <div className={`${styles.stepLine} ${currentStep > step ? styles.completed : ''}`} />}
          </div>
        ))}
      </div>
    );
  };

  const renderBusinessInfoStep = () => {
    return (
      <div className={styles.formStep}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Turf Name</label>
          <input
            type="text"
            name="turfName"
            value={formData.turfName}
            onChange={handleInputChange}
            placeholder="e.g., Green Valley Sports Arena"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>The name displayed to customers when booking your facility.</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Full Address</label>
          <input
            type="text"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={handleInputChange}
            placeholder="e.g., 123 Sports Lane, Downtown"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>The complete physical address of your sports facility.</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Location Pin</label>
          <input
            type="text"
            name="locationPin"
            value={formData.locationPin}
            onChange={handleInputChange}
            placeholder="e.g., Google Maps URL or coordinates"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>A link or coordinates that help customers find your location easily.</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="e.g., +1 234 567 8900"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>The primary phone number for booking inquiries.</p>
        </div>
      </div>
    );
  };

  const renderFacilityDetailsStep = () => {
    const sportsList = ['Football', 'Cricket', 'Tennis', 'Basketball', 'Volleyball', 'Badminton', 'Hockey'];
    const amenitiesList = ['Changing Rooms', 'Parking', 'Refreshments', 'Equipment Rental', 'Washrooms', 'Seating Area', 'WiFi'];
    
    return (
      <div className={styles.formStep}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Turf Size</label>
          <input
            type="text"
            name="turfSize"
            value={formData.turfSize}
            onChange={handleInputChange}
            placeholder="e.g., 100x60 meters"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>The dimensions of your playing area (length x width).</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Surface Type</label>
          <select
            name="surfaceType"
            value={formData.surfaceType}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="">Select a surface type</option>
            <option value="Natural Grass">Natural Grass</option>
            <option value="Artificial Turf">Artificial Turf</option>
            <option value="Clay">Clay</option>
            <option value="Hardwood">Hardwood</option>
            <option value="Concrete">Concrete</option>
            <option value="Synthetic">Synthetic</option>
          </select>
          <p className={styles.fieldDescription}>The type of surface on your playing field.</p>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Available Sports</label>
          <p className={styles.fieldDescription}>Select all sports that can be played at your facility.</p>
          <div className={styles.checkboxGroup}>
            {sportsList.map((sport) => (
              <div key={sport} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  id={sport}
                  checked={formData.availableSports.includes(sport)}
                  onChange={() => handleCheckboxChange('availableSports', sport)}
                  className={styles.checkbox}
                />
                <label htmlFor={sport} className={styles.checkboxLabel}>{sport}</label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.toggleContainer}>
            <label className={styles.label}>Indoor Facility</label>
            <div className={styles.toggleSwitch}>
              <span>Is your facility indoor or outdoor?</span>
              <div 
                className={`${styles.toggle} ${formData.isIndoor ? styles.active : ''}`}
                onClick={() => handleToggleChange('isIndoor')}
              >
                <div className={styles.toggleButton}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Amenities</label>
          <p className={styles.fieldDescription}>Select all amenities available at your facility.</p>
          <div className={styles.checkboxGrid}>
            {amenitiesList.map((amenity) => (
              <div key={amenity} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  id={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleCheckboxChange('amenities', amenity)}
                  className={styles.checkbox}
                />
                <label htmlFor={amenity} className={styles.checkboxLabel}>{amenity}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderOperationsStep = () => {
    return (
      <div className={styles.formStep}>
        <div className={styles.hoursContainer}>
          <div className={styles.hoursColumn}>
            <h3 className={styles.subheading}>Weekday Hours</h3>
            <div className={styles.timeInputs}>
              <div className={styles.timeInput}>
                <label className={styles.timeLabel}>Opening Time</label>
                <input
                  type="time"
                  name="weekdayOpeningTime"
                  value={formData.weekdayOpeningTime}
                  onChange={handleInputChange}
                  className={styles.timeField}
                />
              </div>
              <div className={styles.timeInput}>
                <label className={styles.timeLabel}>Closing Time</label>
                <input
                  type="time"
                  name="weekdayClosingTime"
                  value={formData.weekdayClosingTime}
                  onChange={handleInputChange}
                  className={styles.timeField}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.hoursColumn}>
            <h3 className={styles.subheading}>Weekend Hours</h3>
            <div className={styles.timeInputs}>
              <div className={styles.timeInput}>
                <label className={styles.timeLabel}>Opening Time</label>
                <input
                  type="time"
                  name="weekendOpeningTime"
                  value={formData.weekendOpeningTime}
                  onChange={handleInputChange}
                  className={styles.timeField}
                />
              </div>
              <div className={styles.timeInput}>
                <label className={styles.timeLabel}>Closing Time</label>
                <input
                  type="time"
                  name="weekendClosingTime"
                  value={formData.weekendClosingTime}
                  onChange={handleInputChange}
                  className={styles.timeField}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Hourly Rate ($)</label>
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
            placeholder="0"
            className={styles.input}
          />
          <p className={styles.fieldDescription}>The standard hourly rate for booking your facility.</p>
        </div>

        <div className={styles.specialOffersSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.subheading}>Special Offers (Optional)</h3>
            <button 
              type="button" 
              onClick={addOffer} 
              className={styles.addButton}
            >
              Add Offer
            </button>
          </div>

          {formData.specialOffers.map((offer, index) => (
            <div key={index} className={styles.offerContainer}>
              <div className={styles.offerHeader}>
                <h4 className={styles.offerTitle}>Offer #{index + 1}</h4>
                <button 
                  type="button" 
                  onClick={() => removeOffer(index)} 
                  className={styles.removeButton}
                >
                  🗑️
                </button>
              </div>
              <div className={styles.offerFields}>
                <div className={styles.offerField}>
                  <label className={styles.label}>Description</label>
                  <input
                    type="text"
                    value={offer.description}
                    onChange={(e) => handleOfferChange(index, 'description', e.target.value)}
                    placeholder="e.g., Weekday morning discount"
                    className={styles.input}
                  />
                </div>
                <div className={styles.offerField}>
                  <label className={styles.label}>Discount (%)</label>
                  <input
                    type="number"
                    value={offer.discount}
                    onChange={(e) => handleOfferChange(index, 'discount', e.target.value)}
                    placeholder="0"
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Cancellation Policy</label>
          <textarea
            name="cancellationPolicy"
            value={formData.cancellationPolicy}
            onChange={handleInputChange}
            placeholder="e.g., Free cancellation up to 24 hours before the booking. 50% charge for cancellations within 24 hours."
            className={styles.textarea}
          />
          <p className={styles.fieldDescription}>Clearly describe your cancellation policy for bookings.</p>
        </div>
      </div>
    );
  };

  const renderMediaStep = () => {
    return (
      <div className={styles.formStep}>
        <div className={styles.imagesSection}>
          <h3 className={styles.subheading}>Facility Images</h3>
          <p className={styles.fieldDescription}>
            Upload high-quality images of your facility to attract more customers. You can add up to 10 images.
          </p>
  
          <div className={styles.imageGallery}>
            {formData.images.map((imageUrl, index) => (
              <div key={index} className={styles.imageContainer}>
                <img src={imageUrl} alt={`Facility view ${index + 1}`} className={styles.uploadedImage} />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.imageRemoveButton}
                >
                  ✕
                </button>
              </div>
            ))}
            
            {formData.images.length < 10 && (
              <label className={styles.imageUploadBox}>
                <div className={styles.uploadIcon}>
                  <span className={styles.iconPlus}>+</span>
                  <span className={styles.uploadText}>Add Image</span>
                </div>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      addImage(e.target.files[0]);
                      e.target.value = '';
                    }
                  }}
                  className={styles.fileInput}
                />
              </label>
            )}
          </div>
  
          <div className={styles.imagesTips}>
            <h4 className={styles.tipsTitle}>Tips for great images:</h4>
            <ul className={styles.tipsList}>
              <li>Take photos in good lighting conditions</li>
              <li>Show different angles of your facility</li>
              <li>Include amenities and special features</li>
              <li>Make sure the playing area is clear and visible</li>
            </ul>
          </div>
        </div>
  
        <Slider {...sliderSettings} className={styles.mobileSlider}>
          {formData.images.map((imageUrl, index) => (
            <div key={index} className={styles.sliderImageContainer}>
              <img src={imageUrl} alt={`Facility view ${index + 1}`} className={styles.sliderImage} />
              <button 
                type="button"
                onClick={() => removeImage(index)}
                className={styles.sliderImageRemoveButton}
              >
                ✕
              </button>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBusinessInfoStep();
      case 2:
        return renderFacilityDetailsStep();
      case 3:
        return renderOperationsStep();
      case 4:
        return renderMediaStep();
      default:
        return null;
    }
  };

  return (
    <div className={styles.main}>
    <div className={styles.container}>
      <h1>Register Your Sports Turf</h1>
      {renderProgressBar()}
      <div className={styles.formContainer}>
        {renderStepContent()}
        <div className={styles.navigationButtons}>
          {currentStep > 1 && (
            <button type="button" onClick={prevStep} className={styles.prevButton}>
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button type="button" onClick={nextStep} className={styles.nextButton}>
              Next
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SportsTurfRegistration;