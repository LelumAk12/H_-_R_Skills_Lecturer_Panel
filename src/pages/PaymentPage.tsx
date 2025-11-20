import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { ChevronDownIcon } from 'lucide-react';
import '../styles/PaymentPage.css';
export function PaymentPage() {
  const [activeTab, setActiveTab] = useState<'local' | 'international'>('local');
  const [localForm, setLocalForm] = useState({
    holderName: '',
    accountNumber: '**********1256',
    bankName: '',
    branchName: '',
    amount: 'LKR 0.00',
    remarks: ''
  });
  const [internationalForm, setInternationalForm] = useState({
    holderName: '',
    bankName: '',
    branchName: '',
    accountNumber: '**********1256',
    swiftCode: '**********',
    currency: '',
    amount: '0.00',
    remarks: ''
  });
  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalForm({
      ...localForm,
      [e.target.name]: e.target.value
    });
  };
  const handleInternationalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInternationalForm({
      ...internationalForm,
      [e.target.name]: e.target.value
    });
  };
  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Withdrawal requested');
  };
  return <div className="payment-page">
      <Sidebar userName="Dr. Nadeesha Perera" userEmail="nadeeshaperera@gmail.com" userImage="/Profile.jpg" />

      <div className="payment-main">
        <Header />

        <div className="payment-content">
          <h1 className="payment-title">Payment Received</h1>

          <div className="payment-stats">
            <div className="payment-stat-card">
              <p className="payment-stat-label">Total Earnings</p>
              <p className="payment-stat-value">LKR 250,000.00</p>
            </div>
            <div className="payment-stat-card available">
              <p className="payment-stat-label">Available Balance</p>
              <p className="payment-stat-value green">LKR 180,500.00</p>
            </div>
            <div className="payment-stat-card pending">
              <p className="payment-stat-label">Pending Balance</p>
              <p className="payment-stat-value orange">LKR 25,000.00</p>
            </div>
          </div>

          <div className="payment-section">
            <h2 className="payment-section-title">Withdraw Founds</h2>

            <div className="payment-tabs">
              <button onClick={() => setActiveTab('local')} className={`payment-tab ${activeTab === 'local' ? 'active' : ''}`}>
                Local Transfer
              </button>
              <button onClick={() => setActiveTab('international')} className={`payment-tab ${activeTab === 'international' ? 'active' : ''}`}>
                International Transfer
              </button>
            </div>

            {activeTab === 'local' ? <form onSubmit={handleWithdrawal} className="payment-form">
                <div className="payment-form-group">
                  <label className="payment-label">Bank Holder Name</label>
                  <input type="text" name="holderName" placeholder="Enter Name" value={localForm.holderName} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Account Number</label>
                  <input type="text" name="accountNumber" placeholder="**********1256" value={localForm.accountNumber} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Bank Name</label>
                  <input type="text" name="bankName" placeholder="Bank Name" value={localForm.bankName} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Branch Name</label>
                  <input type="text" name="branchName" placeholder="Branch Name" value={localForm.branchName} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Enter Amount (LKR)</label>
                  <input type="text" name="amount" placeholder="LKR 0.00" value={localForm.amount} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Remarks</label>
                  <input type="text" name="remarks" placeholder="" value={localForm.remarks} onChange={handleLocalChange} className="payment-input" />
                </div>

                <div className="payment-actions">
                  <button type="submit" className="payment-btn withdraw">
                    Request Withdrawal
                  </button>
                </div>
              </form> : <form onSubmit={handleWithdrawal} className="payment-form">
                <div className="payment-form-group">
                  <label className="payment-label">Bank Holder Name</label>
                  <input type="text" name="holderName" placeholder="Enter Name" value={internationalForm.holderName} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Bank Name</label>
                  <input type="text" name="bankName" placeholder="Bank Name" value={internationalForm.bankName} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Branch Name</label>
                  <input type="text" name="branchName" placeholder="Branch Name" value={internationalForm.branchName} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Account Number</label>
                  <input type="text" name="accountNumber" placeholder="**********1256" value={internationalForm.accountNumber} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">SWIFT Code</label>
                  <input type="text" name="swiftCode" placeholder="**********" value={internationalForm.swiftCode} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Currency</label>
                  <div className="payment-select-wrapper">
                    <select name="currency" value={internationalForm.currency} onChange={handleInternationalChange} className="payment-select">
                      <option value="">Select Currency</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="INR">INR - Indian Rupee</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="GBP">GBP - British Pound</option>
                    </select>
                    <ChevronDownIcon className="payment-select-icon" />
                  </div>
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Enter Amount</label>
                  <input type="text" name="amount" placeholder="0.00" value={internationalForm.amount} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-form-group">
                  <label className="payment-label">Remarks</label>
                  <input type="text" name="remarks" placeholder="" value={internationalForm.remarks} onChange={handleInternationalChange} className="payment-input" />
                </div>

                <div className="payment-actions">
                  <button type="submit" className="payment-btn withdraw">
                    Request Withdrawal
                  </button>
                </div>
              </form>}
          </div>
        </div>

        <Footer />
      </div>
    </div>;
}