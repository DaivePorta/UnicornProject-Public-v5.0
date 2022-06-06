Public Class NCClaseCuentaContable
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_ClaseCuentaContable(ByVal p_PTVCUCO_CODE As String, ByVal p_PTVCUCO_CODIGO_SUNAT As String, ByVal p_PTVCUCO_TIPL_CODE As String, ByVal p_PTVCUCO_CLASE_CUENTA As String, ByVal p_PTVCUCO_NOMBRE_CORTO As String, ByVal p_PTVCUCO_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_CLASES_CUENTAS_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CODE", p_PTVCUCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CODIGO_SUNAT", p_PTVCUCO_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_TIPL_CODE", p_PTVCUCO_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CLASE_CUENTA", p_PTVCUCO_CLASE_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_NOMBRE_CORTO", p_PTVCUCO_NOMBRE_CORTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_ESTADO_IND", p_PTVCUCO_ESTADO_IND, ParameterDirection.Input, 253))
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

    Public Function Crear_ClaseCuentaContable(ByVal p_PTVCUCO_CODIGO_SUNAT As String, ByVal p_PTVCUCO_TIPL_CODE As String, ByVal p_PTVCUCO_CLASE_CUENTA As String, ByVal p_PTVCUCO_NOMBRE_CORTO As String, ByVal p_PTVCUCO_ESTADO_IND As String, ByVal p_PTVCUCO_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_CLASES_CUENTAS_CONTABLES", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CODIGO_SUNAT", p_PTVCUCO_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_TIPL_CODE", p_PTVCUCO_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CLASE_CUENTA", p_PTVCUCO_CLASE_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_NOMBRE_CORTO", p_PTVCUCO_NOMBRE_CORTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_ESTADO_IND", p_PTVCUCO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_USUA_ID", p_PTVCUCO_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_ClaseCuentaContable(ByVal p_PTVCUCO_CODE As String, ByVal p_PTVCUCO_CODIGO_SUNAT As String, ByVal p_PTVCUCO_TIPL_CODE As String, ByVal p_PTVCUCO_CLASE_CUENTA As String, ByVal p_PTVCUCO_NOMBRE_CORTO As String, ByVal p_PTVCUCO_ESTADO_IND As String, ByVal p_PTVCUCO_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CLASES_CUENTAS_CONTABLES", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CODE", p_PTVCUCO_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CODIGO_SUNAT", p_PTVCUCO_CODIGO_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_TIPL_CODE", p_PTVCUCO_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_CLASE_CUENTA", p_PTVCUCO_CLASE_CUENTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_NOMBRE_CORTO", p_PTVCUCO_NOMBRE_CORTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_ESTADO_IND", p_PTVCUCO_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVCUCO_USUA_ID", p_PTVCUCO_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstado_Contable(ByVal p_CODE As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ESTADO_CUENTA_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value



            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function











End Class
