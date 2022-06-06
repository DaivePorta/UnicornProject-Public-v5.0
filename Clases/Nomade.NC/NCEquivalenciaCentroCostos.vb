Public Class NCEquivalenciaCentroCostos
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Equivalencia_CentroCostos(ByVal p_PTVEQCC_CODE As String, ByVal p_PTVEQCC_CTLG_CODE As String, ByVal p_PTVEQCC_ESTADO_IND As String, ByVal p_USER As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EQUIVALENCIA_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CODE", p_PTVEQCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CTLG_CODE", p_PTVEQCC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_ESTADO_IND", p_PTVEQCC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_USER, ParameterDirection.Input, 253))
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

    Public Function Crear_Equivalencia_CentroCostos(ByVal p_PTVEQCC_CTLG_CODE As String, ByVal p_PTVEQCC_CECC_CODE_BASE As String, ByVal p_PTVEQCC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQCC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQCC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQCC_ESTADO_IND As String, ByVal p_PTVEQCC_FECHA_INICIO As String, ByVal p_PTVEQCC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQCC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_EQUIVALENCIA_CENTRO_COSTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CTLG_CODE", p_PTVEQCC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECC_CODE_BASE", p_PTVEQCC_CECC_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECD_CODE_BASE", p_PTVEQCC_CECD_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECC_CODE_EQUIVALENTE", p_PTVEQCC_CECC_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECD_CODE_EQUIVALENTE", p_PTVEQCC_CECD_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_ESTADO_IND", p_PTVEQCC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_INICIO", p_PTVEQCC_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVEQCC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_FIN", p_PTVEQCC_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_USUA_ID", p_PTVEQCC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Equivalencia_CentroCostos(ByVal p_PTVEQCC_CODE As String, ByVal p_PTVEQCC_CTLG_CODE As String, ByVal p_PTVEQCC_CECC_CODE_BASE As String, ByVal p_PTVEQCC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQCC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQCC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQCC_ESTADO_IND As String, ByVal p_PTVEQCC_FECHA_INICIO As String, ByVal p_PTVEQCC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQCC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_EQUIVALENCIA_CENTRO_COSTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CODE", p_PTVEQCC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CTLG_CODE", p_PTVEQCC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECC_CODE_BASE", p_PTVEQCC_CECC_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECD_CODE_BASE", p_PTVEQCC_CECD_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECC_CODE_EQUIVALENTE", p_PTVEQCC_CECC_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_CECD_CODE_EQUIVALENTE", p_PTVEQCC_CECD_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_ESTADO_IND", p_PTVEQCC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_INICIO", p_PTVEQCC_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVEQCC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_FECHA_FIN", p_PTVEQCC_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQCC_USUA_ID", p_PTVEQCC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
End Class
