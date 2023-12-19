Public Class NCPersona
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function LISTAR_UPDATE_PRDETERMINADO(ByVal P_PIDM_CONTACTO As Integer, ByVal PIDM_PERSONA As Integer, ByVal P_TIPO As String, ByVal P_TIPO_PERSONA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PPB_LISTAR_UPDATE_PRDETERMINADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM_CONTACTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@PIDM_PERSONA", PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@TIPO_PERSONA", P_TIPO_PERSONA, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function UPDATE_CONTACTO_ACTIVO(ByVal P_PIDM_PERSONA As String, ByVal P_PERSONA As String, ByVal P_ACTIVO As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PPB_UPDATE_CONTACTO_ACTIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PERSONA", P_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACTIVO", P_ACTIVO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTA_CONTACTO_PRINCIPAL(ByVal P_PIDM_PERSONA As Integer, ByVal P_TIPOCONTA As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PPB_LISTAR_CONTAC_ORDEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_PERSONA", P_PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPOCONTA, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function UPDATE_CONTACTO(ByVal P_PIDM_PERSONA As String, ByVal P_PERSONA As String, ByVal P_TIPO As String, ByVal P_TIPOGENERAL As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PPB_UPDATE_CONTACTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PERSONA", P_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPOGENERAL", P_TIPOGENERAL, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function LISTA_CONTACTOS(ByVal P_TIPO As String, ByVal P_PIDM_PERSONA As Integer) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PPB_LISTAR_CONTACTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_PERSONA", P_PIDM_PERSONA, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTA_NUMERO_PIDM(ByVal P_NUMERO_CONTAC As Integer) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PPB_NUMERO_PIDM", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO_CONTAC", P_NUMERO_CONTAC, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function LISTA_NUMERO_CONTACTO(ByVal P_NUMERO_CONTAC As Integer, ByVal P_NUMERO_PERSONA As Integer, ByVal P_TIPO_CONTAC As String) As DataTable

        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PPB_NUMERO_DOCUMENTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO_CONTAC", P_NUMERO_CONTAC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NUMERO_PERSONA", P_NUMERO_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_CONTAC", P_TIPO_CONTAC, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function crear_Persona_contacto(ByVal P_PIDM_PERSONA As String, ByVal P_PIDM_CONTA As String, ByVal P_TIPO As String,
                                           ByVal P_ESTADO As String, ByVal P_ACTIVO As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PPB_CREAR_CONTACTO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_PERSONA", P_PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_CONTA", isNull(P_PIDM_CONTA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", isNull(P_TIPO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", isNull(P_ESTADO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACTIVO", isNull(P_ACTIVO), ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function listar_Persona_Estereotipo(ByVal p_GTVUSUA_ID As String, ByVal p_CTLG_CODE As String, ByVal p_GTVUSUA_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_ESTEREOTIPO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVUSUA_ID", p_GTVUSUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GTVUSUA_ESTADO_IND", p_GTVUSUA_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona(Optional ByVal p_repetidos As String = "N", Optional P_RAZON_SOCIAL As String = "", Optional p_AGENTE_RETEN_IND As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_REPETIDOS", p_repetidos, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RAZON_SOCIAL", P_RAZON_SOCIAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AGENTE_RETEN_IND", p_AGENTE_RETEN_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Mov_Bancario(ByVal p_CTLG As String, Optional p_PIDM As String = "", Optional p_ESTEREOTIPO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_MOV_BANCARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_CTLG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTEREOTIPO", p_ESTEREOTIPO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Natural(ByVal p_PPBIDEN_PIDM As String, ByVal P_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_NATURAL", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PPBDOID_DOID_CODE", P_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Natural_2(ByVal p_PPBIDEN_PIDM As String, ByVal P_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String, ByVal p_PCTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_NATURAL_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PPBDOID_DOID_CODE", P_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTLG_CODE", p_PCTLG_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Natural_Corto(p_PPBIDEN_PIDM As String, P_PPBDOID_DOID_CODE As String, p_PPBDOID_NRO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_NATURAL_CORTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PPBDOID_DOID_CODE", P_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Juridica(p_PPBIDEN_PIDM As String, p_PPBDOID_NRO As String, Optional p_RAZON_SOCIAL As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_JURIDICA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_Persona_Juridica_2(p_PPBIDEN_PIDM As String, p_PPBDOID_NRO As String, p_PCTLG_CODE As String, Optional p_RAZON_SOCIAL As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_PERSONA_JURIDICA_2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PCTLG_CODE", p_PCTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RAZON_SOCIAL", p_RAZON_SOCIAL, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnListarPersonaJuridica() As DataTable
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("LISTAR_PERSONA_JURIDICA", CommandType.StoredProcedure)

            Dim oDT As New DataTable
            oDT = cn.Consulta(cmd)
            If oDT Is Nothing Then
                Return Nothing
            ElseIf oDT.Rows.Count = 0 Then
                Return Nothing
            Else
                Return oDT
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function verificar_Existencia_Persona(p_PPBDOID_DOID_CODE As String, p_PPBDOID_NRO As String, p_PPBDOID_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_VERIFICAR_DNI_RUC_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_ESTADO_IND", p_PPBDOID_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function verificar_Existencia_Nro_Dcto_Persona(p_PPBDOID_DOID_CODE As String, p_PPBDOID_NRO As String, p_PPBDOID_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_VERIFICAR_NRO_DOCUMENTO_PERSONA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_ESTADO_IND", p_PPBDOID_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function crear_Persona_Natural(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String, ByVal p_PPBIDEN_AGENTE_RETEN_IND As String,
                                                              ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String,
                                  ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String, ByVal p_PPBDOID_DOID_CODE As String,
                                  ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String,
                                  ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String,
                                  ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String,
                                  ByVal p_PPBIDEN_INICIO_ACTIVIDAD As String, ByVal p_PPBIDEN_TCON_CODE As String, ByVal p_PPBIDEN_RAZO_COME As String,
                                  ByVal p_PPBIDEN_ACTIVIDAD As String, ByVal p_PPBIDEN_COND_SUNAT As String, ByVal p_PPBIDEN_ESTADO_SUNAT As String,
                                  Optional p_PPBIDEN_BUEN_CONTRIB_IND As String = "N") As Array
        Try
            Dim msg(8) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PERSONA_NATURAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_PATE", p_PPBIDEN_APELL_PATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_MATE", isNull(p_PPBIDEN_APELL_MATE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_NOMBRE", isNull(p_PPBIDEN_NOMBRE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA", isNull(p_PPBIDEN_FECHA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_RETEN_IND", p_PPBIDEN_AGENTE_RETEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ENTIDAD_IND", p_PPBIDEN_ENTIDAD_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TINO_CODE", isNull(p_PPBIDEN_TINO_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_USUA_ID", p_PPBIDEN_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBPEBA_SEXO", isNull(p_PPBPEBA_SEXO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBPEBA_ESCI_CODE", isNull(p_PPBPEBA_ESCI_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO_RUC", isNull(p_PPBDOID_NRO_RUC), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_ESTADO_IND", p_PPBDOID_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_TIDT_CODE", isNull(p_PPRTELE_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_OPERADOR", isNull(p_PPRTELE_OPERADOR), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUMERO", isNull(p_PPRTELE_NUMERO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_TIDT_CODE", isNull(p_PPRCORR_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_CORREO", isNull(p_PPRCORR_CORREO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_TIPO", p_PPBIMAG_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE", p_PPBIMAG_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE_RUC", p_PPBIMAG_NOMBRE_RUC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ID", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUM_SEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_NUM_SEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MSG_RUC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_COMPLETO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_INICIO_ACTIVIDAD", isNull(p_PPBIDEN_INICIO_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TCON_CODE", isNull(p_PPBIDEN_TCON_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RAZO_COME", isNull(p_PPBIDEN_RAZO_COME), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ACTIVIDAD", isNull(p_PPBIDEN_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_BUEN_CONTRIB_IND", p_PPBIDEN_BUEN_CONTRIB_IND, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_COND_SUNAT", IIf(p_PPBIDEN_COND_SUNAT = "", DBNull.Value, p_PPBIDEN_COND_SUNAT), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ESTADO_SUNAT", IIf(p_PPBIDEN_ESTADO_SUNAT = "", DBNull.Value, p_PPBIDEN_ESTADO_SUNAT), ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_PPBIDEN_PIDM").Value
            msg(1) = cmd1.Parameters("@p_PPBIDEN_ID").Value
            msg(2) = cmd1.Parameters("@p_PPRTELE_NUM_SEQ").Value
            msg(3) = cmd1.Parameters("@p_PPRCORR_NUM_SEQ").Value
            msg(4) = cmd1.Parameters("@p_PPBIMAG_CODE").Value
            msg(5) = cmd1.Parameters("@p_MSG_RUC").Value
            msg(6) = cmd1.Parameters("@p_NOMBRE_COMPLETO").Value
            msg(7) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Persona_Natural(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_APELL_MATE As String, ByVal p_PPBIDEN_NOMBRE As String, ByVal p_PPBIDEN_FECHA As String,
                                               ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_USUA_ID As String, ByVal p_PPBPEBA_SEXO As String, ByVal p_PPBPEBA_ESCI_CODE As String,
                                               ByVal p_PPBDOID_NRO_RUC As String, ByVal p_PPRTELE_NUM_SEQ As Integer, ByVal p_PPRTELE_TIDT_CODE As String, ByVal p_PPRTELE_OPERADOR As String, ByVal p_PPRTELE_NUMERO As String,
                                               ByVal p_PPRCORR_NUM_SEQ As Integer, ByVal p_PPRCORR_TIDT_CODE As String, ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_CODE As String,
                                               ByVal p_PPBIMAG_NOMBRE As String, ByVal p_PPBIMAG_NOMBRE_RUC As String, ByVal p_PPBIDEN_INICIO_ACTIVIDAD As String, ByVal p_PPBIDEN_TCON_CODE As String, ByVal p_PPBIDEN_RAZO_COME As String,
                                               ByVal p_PPBIDEN_ACTIVIDAD As String, Optional ByVal p_PPBDOID_DOID_CODE As String = "", Optional ByVal p_PPBDOID_NRO As String = "", Optional p_PPBIDEN_BUEN_CONTRIB_IND As String = "N") As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERSONA_NATURAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_PATE", p_PPBIDEN_APELL_PATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_MATE", isNull(p_PPBIDEN_APELL_MATE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_NOMBRE", isNull(p_PPBIDEN_NOMBRE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA", isNull(p_PPBIDEN_FECHA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_RETEN_IND", p_PPBIDEN_AGENTE_RETEN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_USUA_ID", p_PPBIDEN_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBPEBA_SEXO", p_PPBPEBA_SEXO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBPEBA_ESCI_CODE", isNull(p_PPBPEBA_ESCI_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO_RUC", isNull(p_PPBDOID_NRO_RUC), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_TIPO_DOC", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO_DOC", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUM_SEQ", p_PPRTELE_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_TIDT_CODE", isNull(p_PPRTELE_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_OPERADOR", isNull(p_PPRTELE_OPERADOR), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUMERO", isNull(p_PPRTELE_NUMERO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_NUM_SEQ", p_PPRCORR_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_TIDT_CODE", isNull(p_PPRCORR_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_CORREO", isNull(p_PPRCORR_CORREO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_CODE", p_PPBIMAG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE", p_PPBIMAG_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE_RUC", p_PPBIMAG_NOMBRE_RUC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MSG_RUC", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_INICIO_ACTIVIDAD", isNull(p_PPBIDEN_INICIO_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TCON_CODE", isNull(p_PPBIDEN_TCON_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RAZO_COME", isNull(p_PPBIDEN_RAZO_COME), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ACTIVIDAD", isNull(p_PPBIDEN_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_BUEN_CONTRIB_IND", p_PPBIDEN_BUEN_CONTRIB_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_MSG_RUC").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function crear_Persona_Juridica(ByVal p_PPBIDEN_APELL_PATE As String, ByVal p_PPBIDEN_RAZO_COME As String, ByVal p_PPBIDEN_ACTIVIDAD As String,
                                        ByVal p_PPBIDEN_CONTACTO As String, ByVal p_PPBIDEN_REP_LEGAL As String, ByVal p_PPBIDEN_WEB As String,
                                        ByVal p_PPBIDEN_AGENTE_RETEN_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_RETEN As String,
                                        ByVal p_PPBIDEN_AGENTE_PERCEP_IND As String, ByVal p_PPBIDEN_FECHA_AGENTE_PERCEP As String, ByVal p_PPBIDEN_RELACIONADA_IND As String,
                                        ByVal p_PPBIDEN_RELACIONADA_CODE As String, ByVal p_PPBIDEN_ENTIDAD_IND As String, ByVal p_PPBIDEN_TINO_CODE As String, ByVal p_PPBIDEN_USUA_ID As String,
                                         ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String, ByVal p_PPBDOID_ESTADO_IND As String, ByVal p_PPRTELE_TIDT_CODE As String,
                                        ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_TIDT_CODE As String,
                                        ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_TIPO As String, ByVal p_PPBIMAG_NOMBRE As String,
                                        ByVal p_PPBIDEN_INICIO_ACTIVIDAD As String, ByVal p_PPBIDEN_TCON_CODE As String,
                                        ByVal p_CONDI_SUNAT As String, ByVal P_ESTADO_SUNAT As String,
                                        Optional p_PPBIDEN_BUEN_CONTRIB_IND As String = "N", Optional p_PPBIDEN_FECHA_BUEN_CONTRIB As String = "") As Array
        Try
            Dim msg(6) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_PERSONA_JURIDICA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_PATE", p_PPBIDEN_APELL_PATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RAZO_COME", isNull(p_PPBIDEN_RAZO_COME), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ACTIVIDAD", isNull(p_PPBIDEN_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_CONTACTO", isNull(p_PPBIDEN_CONTACTO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_REP_LEGAL", isNull(p_PPBIDEN_REP_LEGAL), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_WEB", isNull(p_PPBIDEN_WEB), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_RETEN_IND", isNull(p_PPBIDEN_AGENTE_RETEN_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_AGENTE_RETEN", isNull(p_PPBIDEN_FECHA_AGENTE_RETEN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_PERCEP_IND", isNull(p_PPBIDEN_AGENTE_PERCEP_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_AGENTE_PERCEP", isNull(p_PPBIDEN_FECHA_AGENTE_PERCEP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RELACIONADA_IND", isNull(p_PPBIDEN_RELACIONADA_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RELACIONADA_CODE", isNull(p_PPBIDEN_RELACIONADA_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ENTIDAD_IND", isNull(p_PPBIDEN_ENTIDAD_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TINO_CODE", isNull(p_PPBIDEN_TINO_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_USUA_ID", p_PPBIDEN_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_ESTADO_IND", p_PPBDOID_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_TIDT_CODE", isNull(p_PPRTELE_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUMERO", isNull(p_PPRTELE_NUMERO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_TIDT_CODE", isNull(p_PPRCORR_TIDT_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_CORREO", isNull(p_PPRCORR_CORREO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_TIPO", p_PPBIMAG_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE", p_PPBIMAG_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ID", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUM_SEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_NUM_SEQ", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_INICIO_ACTIVIDAD", isNull(p_PPBIDEN_INICIO_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TCON_CODE", isNull(p_PPBIDEN_TCON_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_BUEN_CONTRIB_IND", p_PPBIDEN_BUEN_CONTRIB_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_BUEN_CONTRIB", isNull(p_PPBIDEN_FECHA_BUEN_CONTRIB), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_COND_SUNAT", IIf(p_CONDI_SUNAT = "", DBNull.Value, p_CONDI_SUNAT), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ESTADO_SUNAT", IIf(P_ESTADO_SUNAT = "", DBNull.Value, P_ESTADO_SUNAT), ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_PPBIDEN_PIDM").Value
            msg(1) = cmd1.Parameters("@p_PPBIDEN_ID").Value
            msg(2) = cmd1.Parameters("@p_PPRTELE_NUM_SEQ").Value
            msg(3) = cmd1.Parameters("@p_PPRCORR_NUM_SEQ").Value
            msg(4) = cmd1.Parameters("@p_PPBIMAG_CODE").Value
            msg(5) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'DPORTA
    Public Function Modificar_Estado_Persona_Juridica(ByVal p_CTLG_CODE As String, ByVal p_ESTADO_IND_J As String, ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_MODIFICAR_ESTADO_PERSONA_JURIDICA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND_J", p_ESTADO_IND_J, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    'DPORTA
    Public Function Modificar_Estado_Persona_Natural(ByVal p_CTLG_CODE As String, ByVal p_ESTADO_IND_N As String, ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_MODIFICAR_ESTADO_PERSONA_NATURAL", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND_N", p_ESTADO_IND_N, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_Persona_Juridica(ByVal p_PPBIDEN_PIDM As Integer, ByVal p_PPBIDEN_APELL_PATE As String,
                                                ByVal p_PPBIDEN_RAZO_COME As String, ByVal p_PPBIDEN_ACTIVIDAD As String, ByVal p_PPBIDEN_CONTACTO As String,
                                                ByVal p_PPBIDEN_REP_LEGAL As String, ByVal p_PPBIDEN_WEB As String, ByVal p_PPBIDEN_AGENTE_RETEN_IND As String,
                                                ByVal p_PPBIDEN_FECHA_AGENTE_RETEN As String, ByVal p_PPBIDEN_AGENTE_PERCEP_IND As String,
                                                ByVal p_PPBIDEN_FECHA_AGENTE_PERCEP As String, ByVal p_PPBIDEN_RELACIONADA_IND As String, ByVal p_PPBIDEN_RELACIONADA_CODE As String,
                                                ByVal p_PPBIDEN_USUA_ID As String, ByVal p_PPBDOID_DOID_CODE As String, ByVal p_PPBDOID_NRO As String,
                                                ByVal p_PPRTELE_NUM_SEQ As Integer, ByVal p_PPRTELE_NUMERO As String, ByVal p_PPRCORR_NUM_SEQ As Integer,
                                                ByVal p_PPRCORR_CORREO As String, ByVal p_PPBIMAG_CODE As String, ByVal p_PPBIMAG_NOMBRE As String,
                                                ByVal p_PPBIDEN_INICIO_ACTIVIDAD As String, ByVal p_PPBIDEN_TCON_CODE As String,
                                                Optional p_PPBIDEN_BUEN_CONTRIB_IND As String = "N", Optional p_PPBIDEN_FECHA_BUEN_CONTRIB As String = "") As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_PERSONA_JURIDICA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_PIDM", p_PPBIDEN_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_APELL_PATE", p_PPBIDEN_APELL_PATE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RAZO_COME", isNull(p_PPBIDEN_RAZO_COME), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_ACTIVIDAD", isNull(p_PPBIDEN_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_CONTACTO", isNull(p_PPBIDEN_CONTACTO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_REP_LEGAL", isNull(p_PPBIDEN_REP_LEGAL), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_WEB", isNull(p_PPBIDEN_WEB), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_RETEN_IND", isNull(p_PPBIDEN_AGENTE_RETEN_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_AGENTE_RETEN", isNull(p_PPBIDEN_FECHA_AGENTE_RETEN), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_AGENTE_PERCEP_IND", isNull(p_PPBIDEN_AGENTE_PERCEP_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_AGENTE_PERCEP", isNull(p_PPBIDEN_FECHA_AGENTE_PERCEP), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RELACIONADA_IND", isNull(p_PPBIDEN_RELACIONADA_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_RELACIONADA_CODE", isNull(p_PPBIDEN_RELACIONADA_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_USUA_ID", p_PPBIDEN_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_DOID_CODE", p_PPBDOID_DOID_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBDOID_NRO", p_PPBDOID_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUM_SEQ", p_PPRTELE_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRTELE_NUMERO", isNull(p_PPRTELE_NUMERO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_NUM_SEQ", p_PPRCORR_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPRCORR_CORREO", isNull(p_PPRCORR_CORREO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_CODE", p_PPBIMAG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIMAG_NOMBRE", p_PPBIMAG_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_INICIO_ACTIVIDAD", isNull(p_PPBIDEN_INICIO_ACTIVIDAD), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_TCON_CODE", isNull(p_PPBIDEN_TCON_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_BUEN_CONTRIB_IND", p_PPBIDEN_BUEN_CONTRIB_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PPBIDEN_FECHA_BUEN_CONTRIB", isNull(p_PPBIDEN_FECHA_BUEN_CONTRIB), ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg(0) = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try

    End Function

    Public Function listar_ubigeo_direcciones(ByVal p_UBIDIREC As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPP_LISTAR_UBIGEO_DIRECCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_UBIDIREC", p_UBIDIREC, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_direcciones(ByVal p_PIDM As String, ByVal p_NUM_SEQ As String, ByVal p_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPP_LISTAR_DIRECCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NUM_SEQ", p_NUM_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listar_tipo_documento(ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("NAM_LISTAR_TIPO_DOCUMENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Function isNull(ByVal p_Value As Object) As Object
        Return IIf(Trim(p_Value.ToString) = String.Empty, DBNull.Value, p_Value)
    End Function

    Public Function fListarPersonaNatural()
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_ListarClienteNatural", CommandType.StoredProcedure)

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ActualizarTipoAgente(ByVal p_PIDM As String, ByVal p_RUC As String, ByVal p_TIPO As String,
                                         ByVal p_FECHA_INICIO As String, ByVal p_RESOLUCION As String, ByVal p_USUA_ID As String) As Array
        Dim msg(2) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PPP_ACTUALIZAR_TIPO_AGENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUC", p_RUC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_FECHA_INICIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESOLUCION", p_RESOLUCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_RESPUESTA").Value

        Catch ex As Exception
            msg(0) = ex.Message
        End Try

        Return msg
    End Function

    Public Function ListarTipoAgente(ByVal p_PIDM As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPP_LISTAR_DATOS_TIPO_AGENTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fnActualizarDatosSunatContribuyente(ByVal P_PIDM_PERSONA As String, ByVal P_COND_SUNAT As String, ByVal P_ESTADO_SUNAT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_DATOS_CONTRIBUYENTE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", P_PIDM_PERSONA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COND_SUNAT", P_COND_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_SUNAT", P_ESTADO_SUNAT, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

