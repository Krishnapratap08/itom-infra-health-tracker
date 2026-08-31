import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: 'ccfffa03a8cb40cd94210ccb98a314ae'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: 'c5be9c6514c84063aaab509b776699a8'
                    }
                }
                composite: [
                    {
                        table: 'sys_security_acl_role'
                        id: '064bc028658b450abf672417b0f6bdac'
                        key: {
                            sys_security_acl: 'b5c57b5691c845c2aaae01840e71bf2a'
                            sys_user_role: {
                                id: 'bad51bff1228440381aaa3cbe7476915'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '0a4add5911e0478fac0a53481f05ce10'
                        key: {
                            sys_security_acl: 'd12fb48ce8a049d9b569d0ec1d8173db'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0e9bb5bbfc894ec9b167efe384670930'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'correlated_incident'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '103dc820e9d64d8a822d60b58caf960b'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '17bbc151afa849d18a92a73614e501e8'
                        key: {
                            sys_security_acl: 'e4c87922756240ac8ee93cf68a5653fb'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1810a171b94e4650837683b87d4b033b'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                            value: 'warning'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c2d792ab91b4a089a8881cec2b459fb'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'service_name'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '24bb75764e6646fb9deac6def13a1101'
                        key: {
                            sys_security_acl: '8695449e83b1437f825d4e3902a8e37d'
                            sys_user_role: {
                                id: 'bad51bff1228440381aaa3cbe7476915'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '24fa992e98104ff9b87ae8dea8b149d0'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2986146db20b4c1e89efae512e27b047'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '33879e49eb7b44e5b1109add04cf1b1b'
                        key: {
                            logical_table_name: 'x_1980074_itom_i_0_svc_evt'
                            col_name_string: 'correlated_incident'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '45196a0209404360b8ff4b4d5323c7d1'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'owner_group'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '4c833aedbe644e31a100cef12ad23af1'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4cdb671ee108436e81dfa003620bc0bc'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                            value: 'down'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54e5b581000044f3a65266cf5b29a7a7'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57ab19d3349f42ef921d83e7002be085'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            value: 'info'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '5900d552d8274983b2be2b48dfcdb008'
                        key: {
                            sys_security_acl: 'da8240e763de4a5c989c1eec26f758d1'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b161613d7634886b530d1a7ce415295'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b9b574730434f6cb9359ad39b93e780'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            value: 'critical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66ab617cdd814b17a516231d3121c336'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'ci_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '67a6c1dc1fcf4f60937fa9a71cc354f7'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '6b482d7423ff4df08fb779fb23611355'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7bd6a39c6bcf4d75a3074e39f930ab0f'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'timestamp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7c9df71947cfc7909378f884116d434f'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7d48bf057a6a4b77a0b12ed6ce424826'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                            value: 'up'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '82caf2d7c954417a8be0072f8675bb5d'
                        key: {
                            logical_table_name: 'x_1980074_itom_i_0_mon_svc'
                            col_name_string: 'owner_group'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '867ba1c0b4af4f9bbf73a42e85d9ac0d'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '96139588a43847e481538c31e2dda6a9'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            value: 'minor'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9a7f7fcc0fa4452cbf08facc5a0529b6'
                        key: {
                            sys_security_acl: '8695449e83b1437f825d4e3902a8e37d'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a65afd6eb384463e9e08247a3951ce4b'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                            value: 'down'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a7a654f8fa5b4a749c317b9098955a37'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'ci_reference'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'aa418175b09d430882053c24e6d748e3'
                        key: {
                            sys_security_acl: 'd2f64d4240c04869bce8e8db9d28bd29'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4172af31d2b49cfa102f8cb127d600b'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'b6f02698775d4251acafd24dea342dee'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b7beb2024e094fc6aad1751058a6dcf6'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'owner_group'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'bad51bff1228440381aaa3cbe7476915'
                        key: {
                            name: 'x_1980074_itom_i_0.itom_health_user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bbbe7082b6bf427eb090b24898da7c96'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'last_checked'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bcde05f7f68a45ac917b697651a80d8c'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            value: 'major'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf33811c7df94d43b49ca1d425d805a9'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c0b83c9f30b8470bac85a9b1e0b062df'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'service_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ca9d3b1947cfc7909378f884116d43f0'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cb36ce2851cf46098d66db654f993260'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'severity'
                            value: 'warning'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc2623a41b49442fab7c23a43f1eb85d'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'last_checked'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'd2fd947d641e4809b58b5e610a02bced'
                        key: {
                            name: 'x_1980074_itom_i_0.itom_health_admin'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'd3e1af600dc24c5499f07eb237707ad0'
                        key: {
                            logical_table_name: 'x_1980074_itom_i_0_mon_svc'
                            col_name_string: 'ci_reference'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd446f36fc2e04df4b0c1b9a81a22cbe1'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd486f624d7f244349e097c67a5d27d2c'
                        key: {
                            sys_security_acl: 'b5c57b5691c845c2aaae01840e71bf2a'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4e8ed4d60b84985b30f7d0827afccde'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd6bfbf315c6e4621aa16266cee95b664'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                            value: 'degraded'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8579c50319b4ecda9403e0f00cd8c31'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                            value: 'unknown'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd9255f9cba4b461e835ffa6327cd3439'
                        key: {
                            sys_security_acl: 'd44f94054e87400980e4acec52d8f2b5'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'da85d40e80ae453885c4847ddcd54a92'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'ci_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'dacb3f1547cfc7909378f884116d43d9'
                        key: {
                            name: 'x_1980074_itom_i_0.admin'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'decb3f1547cfc7909378f884116d43f0'
                        key: {
                            name: 'x_1980074_itom_i_0.user'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e69959f90c8344e198a623ce38e2391c'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'ci_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9aabcb82cd74071820837194b04f86f'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_source'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'eba6cd6ecad44ba588665ff2b4bf8a66'
                        key: {
                            logical_table_name: 'x_1980074_itom_i_0_svc_evt'
                            col_name_string: 'ci_reference'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ebfeb8a3a8cb4106a1a0802ccc57a34e'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'event_type'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ec9e2c1680fb4c13beb86ba8f439736d'
                        key: {
                            sys_security_acl: '532f1157577f40e0804fc43a47783ea5'
                            sys_user_role: {
                                id: 'd2fd947d641e4809b58b5e610a02bced'
                                key: {
                                    name: 'x_1980074_itom_i_0.itom_health_admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f84a2b493d3c4331a990fc328a854328'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'correlated_incident'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fbf15ad1b2cc4fb58b7c4821f7377b02'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                            element: 'status'
                            value: 'up'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fe18e67342574a958789f5ffc87cfcc5'
                        key: {
                            name: 'x_1980074_itom_i_0_mon_svc'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fedd37db9957466db102371779546dcf'
                        key: {
                            name: 'x_1980074_itom_i_0_svc_evt'
                            element: 'timestamp'
                        }
                    },
                ]
            }
        }
    }
}
