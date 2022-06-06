Public Class AsignacionFondo
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function LISTAR_INGRESO_EGRESO_CAJA(ByVal p_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String, ByVal p_TIPO_MOV_IND As String, _
                                               ByVal p_ESTADO_IND As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_INGRESO_EGRESO_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_MOV_IND", p_TIPO_MOV_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO", p_TIPO, ParameterDirection.Input, 253))
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

    Public Function CREAR_ASIGNACIONES(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String, ByVal p_TIPO_MOV_IND As String, ByVal p_TIPO_DCTO As String, _
                                       ByVal p_NRO_DCTO As String, ByVal p_BENEFICIARIO_PIDM As String, ByVal p_CONC_CODE As String, _
                                       ByVal p_GLOSA As String, ByVal p_ASIGNADO_PIDM As String, ByVal p_MONE_CODE As String, _
                                       ByVal p_MONTO As String, ByVal p_ESTADO_IND As String, ByVal p_USUA_ID As String) As String
        Try
            Dim cmd As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFB_CREAR_INGRESO_EGRESO_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_MOV_IND", p_TIPO_MOV_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_NRO_DCTO", p_NRO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_BENEFICIARIO_PIDM", p_BENEFICIARIO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ASIGNADO_PIDM", p_ASIGNADO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ACTUALIZAR_ASIGNACIONES(ByVal p_CODE As String, ByVal p_CAJA_CODE As String, ByVal p_TIPO_MOV_IND As String, _
                                            ByVal p_TIPO_DCTO As String, ByVal p_NRO_DCTO As String, ByVal p_BENEFICIARIO_PIDM As String, _
                                            ByVal p_CONC_CODE As String, ByVal p_GLOSA As String, ByVal p_ASIGNADO_PIDM As String, _
                                            ByVal p_MONE_CODE As String, ByVal p_MONTO As String, _
                                            ByVal p_USUA_ID As String) As String
        Try
            Dim cmd As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_INGRESO_EGRESO_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_MOV_IND", p_TIPO_MOV_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO_DCTO", p_TIPO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_NRO_DCTO", p_NRO_DCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_BENEFICIARIO_PIDM", p_BENEFICIARIO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_CONC_CODE", p_CONC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_ASIGNADO_PIDM", p_ASIGNADO_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ACTUALIZAR_ASIGNACIONES_ESTADO(ByVal p_CODE As String, ByVal p_TIPO As String) As String
        Try
            Dim cmd As IDbCommand
            Dim msg As String

            cmd = cn.GetNewCommand("PFB_ACTUALIZAR_INGRESO_EGRESO_ESTADO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
