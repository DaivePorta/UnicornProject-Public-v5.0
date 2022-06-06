Public Class MPProcesoProductivo
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function ListarProcesoProductivo(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_ESTADO_IND As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_LISTAR_PROCESO_PRODUCTIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Return Nothing
        End Try
    End Function

    Public Function CrearProcesoProductivo(ByVal P_CTLG_CODE As String, ByVal P_PROCESO As String, ByVal P_DESCRIPCION As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CREAR_PROCESO_PRODUCTIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROCESO", P_PROCESO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODE").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ActualizarProcesoProductivo(ByVal P_CODE As String, ByVal P_PROCESO As String, ByVal P_DESCRIPCION As String, ByVal P_ESTADO_IND As String, ByVal P_USUA_ID As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFR_ACTUALIZAR_PROCESO_PRODUCTIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PROCESO", P_PROCESO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

            cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoProcesoProductivo(ByVal P_CODE As String, ByVal P_USUA_ID As String) As String
        Try
            Dim estado As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFR_CAMBIAR_ESTADO_PROCESO_PRODUCTIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            estado = cmd1.Parameters("@P_ESTADO").Value

            Return estado

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
