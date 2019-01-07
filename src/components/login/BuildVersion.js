import React from 'react';
var gitVer = 1254;
gitVer = gitVer || '0';
const BuildVersion = () => {
  return (
    <div className="version_number" id="buildVersion">Ver: 1.1.{gitVer}</div>
  );
};
export default BuildVersion;
