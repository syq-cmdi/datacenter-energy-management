# Data Center Energy Management System

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![OpenEMS](https://img.shields.io/badge/Based%20on-OpenEMS-orange.svg)](https://github.com/OpenEMS/openems)

## 📋 Overview

A comprehensive energy management system designed specifically for data center facilities, built on the OpenEMS platform. This system provides real-time monitoring, intelligent control, and optimization of energy consumption across data center infrastructure.

## 🎯 Key Features

### Monitoring & Analytics
- **Real-time Power Monitoring**: Track power consumption across servers, cooling systems, and facility equipment
- - **PUE Calculation**: Automated Power Usage Effectiveness metrics
  - - **Energy Dashboards**: Comprehensive visualization of energy flows and consumption patterns
    - - **Historical Data Analysis**: Long-term trend analysis and reporting
     
      - ### Intelligent Control
      - - **Peak Shaving**: Reduce peak demand charges through intelligent load management
        - - **Time-of-Use Optimization**: Leverage dynamic electricity pricing
          - - **UPS Management**: Intelligent battery storage and backup power coordination
            - - **Cooling Optimization**: Dynamic cooling system control based on workload and temperature
             
              - ### Integration
              - - **Server Monitoring**: IPMI/Redfish integration for server-level power data
                - - **PDU Integration**: Smart PDU monitoring and control
                  - - **DCIM Integration**: Compatible with existing Data Center Infrastructure Management systems
                    - - **API Gateway**: RESTful API for external system integration
                     
                      - ## 🏗️ Architecture
                     
                      - The system follows OpenEMS's three-tier architecture:
                     
                      - ```
                        ┌─────────────────────────────────────────────────────────────┐
                        │                     OpenEMS Backend                          │
                        │              (Cloud/Central Management)                      │
                        │     - Multi-site aggregation                                │
                        │     - Historical data storage                               │
                        │     - Advanced analytics                                    │
                        └─────────────────────────────────────────────────────────────┘
                                                   ▲
                                                   │ Internet
                                                   ▼
                        ┌─────────────────────────────────────────────────────────────┐
                        │                     OpenEMS Edge                             │
                        │                   (On-site Controller)                       │
                        │     - Real-time monitoring                                  │
                        │     - Local control algorithms                              │
                        │     - Device communication                                  │
                        └─────────────────────────────────────────────────────────────┘
                                                   │
                                ┌──────────────────┼──────────────────┐
                                ▼                  ▼                  ▼
                            ┌────────┐        ┌────────┐        ┌────────┐
                            │Servers │        │ Cooling│        │  UPS   │
                            │  PDUs  │        │ CRAC   │        │Battery │
                            └────────┘        └────────┘        └────────┘
                        ```

                        ## 📦 Project Structure

                        ```
                        datacenter-energy-management/
                        ├── openems-edge/              # Edge device implementations
                        │   ├── controllers/           # Control algorithms
                        │   │   ├── PeakShavingController.java
                        │   │   ├── CoolingOptimizationController.java
                        │   │   └── UPSManagementController.java
                        │   ├── devices/              # Device drivers
                        │   │   ├── ipmi/            # IPMI server monitoring
                        │   │   ├── pdu/             # Smart PDU integration
                        │   │   ├── ups/             # UPS systems
                        │   │   └── cooling/         # Cooling systems (CRAC/CRAH)
                        │   └── schedulers/           # Scheduling logic
                        │       └── TimeOfUseScheduler.java
                        ├── openems-backend/          # Backend services
                        │   ├── api/                 # REST API endpoints
                        │   ├── aggregation/         # Multi-site data aggregation
                        │   └── analytics/           # Advanced analytics
                        ├── openems-ui/              # Web interface
                        │   ├── datacenter-dashboard/  # Custom DC dashboards
                        │   ├── pue-monitor/          # PUE monitoring views
                        │   └── alerts/               # Alert management
                        ├── config/                  # Configuration files
                        │   ├── edge-config.json     # Edge configuration
                        │   ├── backend-config.json  # Backend configuration
                        │   └── devices/             # Device configurations
                        ├── docs/                    # Documentation
                        │   ├── installation.md
                        │   ├── configuration.md
                        │   └── api-reference.md
                        └── docker/                  # Docker deployment
                            ├── docker-compose.yml
                            └── Dockerfile
                        ```

                        ## 🚀 Quick Start

                        ### Prerequisites

                        - Java 11 or higher
                        - - Maven 3.6+
                          - - Docker (optional, for containerized deployment)
                            - - OpenEMS core libraries
                             
                              - ### Installation
                             
                              - 1. Clone the repository:
                                2. ```bash
                                   git clone https://github.com/syq-cmdi/datacenter-energy-management.git
                                   cd datacenter-energy-management
                                   ```

                                   2. Build the project:
                                   3. ```bash
                                      mvn clean install
                                      ```

                                      3. Configure your data center devices:
                                      4. ```bash
                                         cp config/edge-config.example.json config/edge-config.json
                                         # Edit config/edge-config.json with your device details
                                         ```

                                         4. Run OpenEMS Edge:
                                         5. ```bash
                                            cd openems-edge
                                            java -jar target/openems-edge.jar
                                            ```

                                            5. Access the UI:
                                            6. ```
                                               http://localhost:8080
                                               ```

                                               ## 🔧 Configuration

                                               ### Server Monitoring (IPMI)

                                               ```json
                                               {
                                                 "class": "io.openems.edge.device.ipmi.ServerMonitor",
                                                 "id": "server0",
                                                 "ipAddress": "192.168.1.100",
                                                 "username": "admin",
                                                 "password": "password"
                                               }
                                               ```

                                               ### Smart PDU

                                               ```json
                                               {
                                                 "class": "io.openems.edge.device.pdu.SmartPDU",
                                                 "id": "pdu0",
                                                 "ipAddress": "192.168.1.101",
                                                 "protocol": "SNMP"
                                               }
                                               ```

                                               ### Cooling System

                                               ```json
                                               {
                                                 "class": "io.openems.edge.device.cooling.CRAC",
                                                 "id": "crac0",
                                                 "ipAddress": "192.168.1.102",
                                                 "targetTemperature": 22.0
                                               }
                                               ```

                                               ## 📊 Key Metrics

                                               - **PUE (Power Usage Effectiveness)**: Total Facility Power / IT Equipment Power
                                               - - **DCiE (Data Center infrastructure Efficiency)**: 1 / PUE
                                                 - - **Carbon Intensity**: CO2 emissions per kWh
                                                   - - **Cost Savings**: Real-time and projected energy cost savings
                                                    
                                                     - ## 🔌 Supported Devices
                                                    
                                                     - ### Monitoring
                                                     - - IPMI/Redfish compatible servers
                                                       - - Smart PDUs (SNMP, Modbus)
                                                         - - Environmental sensors
                                                           - - Power meters
                                                            
                                                             - ### Control
                                                             - - UPS systems with API access
                                                               - - CRAC/CRAH units
                                                                 - - Variable frequency drives (VFDs)
                                                                   - - Automated transfer switches (ATS)
                                                                    
                                                                     - ## 🤝 Contributing
                                                                    
                                                                     - We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.
                                                                    
                                                                     - 1. Fork the repository
                                                                       2. 2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
                                                                          3. 3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
                                                                             4. 4. Push to the branch (`git push origin feature/AmazingFeature`)
                                                                                5. 5. Open a Pull Request
                                                                                  
                                                                                   6. ## 📝 License
                                                                                  
                                                                                   7. This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
                                                                                  
                                                                                   8. Based on [OpenEMS](https://github.com/OpenEMS/openems):
                                                                                   9. - OpenEMS Edge & Backend: Eclipse Public License 2.0
                                                                                      - - OpenEMS UI: GNU Affero General Public License v3.0
                                                                                       
                                                                                        - ## 🙏 Acknowledgments
                                                                                       
                                                                                        - - [OpenEMS Association e.V.](https://openems.io/) for the core platform
                                                                                          - - [FENECON GmbH](https://fenecon.de/) for OpenEMS development
                                                                                            - - Data Center community for feedback and requirements
                                                                                             
                                                                                              - ## 📧 Contact
                                                                                             
                                                                                              - - Project Maintainer: syq-cmdi
                                                                                                - - Community Forum: [OpenEMS Community](https://community.openems.io/)
                                                                                                  - - Issues: [GitHub Issues](https://github.com/syq-cmdi/datacenter-energy-management/issues)
                                                                                                   
                                                                                                    - ## 🗺️ Roadmap
                                                                                                   
                                                                                                    - - [x] Core architecture design
                                                                                                      - [ ] - [ ] IPMI/Redfish device drivers
                                                                                                      - [ ] - [ ] Smart PDU integration
                                                                                                      - [ ] - [ ] UPS management system
                                                                                                      - [ ] - [ ] Cooling optimization algorithms
                                                                                                      - [ ] - [ ] Machine learning for predictive optimization
                                                                                                      - [ ] - [ ] Multi-site management dashboard
                                                                                                      - [ ] - [ ] Carbon tracking and reporting
                                                                                                      - [ ] - [ ] Integration with cloud providers (AWS, Azure, GCP)
                                                                                                     
                                                                                                      - [ ] ---
                                                                                                     
                                                                                                      - [ ] **Note**: This is an open-source project under active development. We appreciate your patience and contributions!
