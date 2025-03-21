import React from 'react'

function FilterBar({ companies, filterCompany, setFilterCompany }) {
  return (
    <div className="filter-bar">
      <label>
        Filter by Company:
        <select 
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
        >
          <option value="">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FilterBar