Public Class NNAdelantoSueldo
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarAdelanto(p_PIDM As Integer, p_MES As Integer, p_ANIO As Integer,
                                   p_ESTADO_IND As String, p_CODE As Integer, p_CTLG_CODE As String, p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTA_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))

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

    Public Function Crear_Adelanto(p_PIDM As Integer, p_CTLG_CODE As String, p_SCSL_CODE As String,
                                  p_MONTO As String, p_MONE_CODE As String, p_MOTIVO As String,
                                  p_USUA_ID As String, p_TOPE As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOPE", p_TOPE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Adelanto(p_PIDM As Integer, p_NRO_DOC As String, p_MONTO As String, p_MONE_CODE As String,
                                      p_MOTIVO As String, p_USUA_ID As String, p_TOPE As String) As Array
        Try
            Dim msg(3) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_NRO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MOTIVO", p_MOTIVO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_VALIDACION", String.Empty, ParameterDirection.Output, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_TOPE", p_TOPE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            msg(1) = cmd1.Parameters("@p_GENERADO").Value
            msg(2) = cmd1.Parameters("@p_VALIDACION").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Rechazar_Adelanto(p_CODE As Integer, p_USUA_ID As String) As Array
        Try
            Dim msg(1) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_RECHAZAR_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Detalle_Adelanto(p_RHADEMP_CODE As Integer) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_DETALLE_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHADEMP_CODE", p_RHADEMP_CODE, ParameterDirection.Input, 253))

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

    Public Function Crear_Detalle_Adelanto(p_RHADEMP_CODE As Integer, p_TIPO_PLANI As String, p_MES As String,
                                 p_ANIO As String, p_MONTO As String,p_USUA_ID As String) As Array
        Try
            Dim msg(0) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_DETALLE_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_RHADEMP_CODE", p_RHADEMP_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_PLANI", p_TIPO_PLANI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO", p_MONTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Grabar_Detalle_Adelanto(p_CODE As Integer, p_MONTO_APR As String, p_TEXT As String,
                                p_USUA_ID As String, p_MONE_CODE As String, p_PIDM As Integer, p_NRO_DOC As String, p_CTLG_CODE As String, p_SCSL_CODE As String) As Array
        Try
            Dim msg(0) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_GRABAR_DETALLE_ADELANTO_SUELDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONTO_APR", p_MONTO_APR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT", p_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONE_CODE", p_MONE_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NRO_DOC", p_NRO_DOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
