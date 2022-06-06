Public Class NCNivelPlanContable
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_NivelPlanContable(ByVal p_PTVNIPL_CODE As String, ByVal p_PTVNIPL_CTLG_CODE As String, ByVal p_PTVNIPL_TIPL_CODE As String, ByVal p_PTVNIPL_NOMBRE_PLAN As String, ByVal p_PTVNIPL_ESTADO_IND As String, ByVal p_USER As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_NIVELES_PLAN_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CODE", p_PTVNIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CTLG_CODE", p_PTVNIPL_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_TIPL_CODE", p_PTVNIPL_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NOMBRE_PLAN", p_PTVNIPL_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_ESTADO_IND", p_PTVNIPL_ESTADO_IND, ParameterDirection.Input, 253))
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

    Public Function Crear_NivelPlanContable(ByVal p_PTVNIPL_CTLG_CODE As String, ByVal p_PTVNIPL_TIPL_CODE As String, ByVal p_PTVNIPL_NOMBRE_PLAN As String, ByVal p_PTVNIPL_NIVELES As Integer,
                                            ByVal p_PTVNIPL_NIVEL1 As Integer, ByVal p_PTVNIPL_NIVEL2 As Integer, ByVal p_PTVNIPL_NIVEL3 As Integer, ByVal p_PTVNIPL_NIVEL4 As Integer,
                                            ByVal p_PTVNIPL_NIVEL5 As Integer, ByVal p_PTVNIPL_NIVEL6 As Integer, ByVal p_PTVNIPL_NIVEL7 As Integer, ByVal p_PTVNIPL_NIVEL8 As Integer,
                                            ByVal p_PTVNIPL_ESTADO_IND As String, ByVal p_PTVNIPL_FECHA_INICIO As String, ByVal p_PTVNIPL_FECHA_FIN As String, ByVal p_PTVNIPL_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_CREAR_NIVELES_PLAN_CONTABLE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CTLG_CODE", p_PTVNIPL_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_TIPL_CODE", p_PTVNIPL_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NOMBRE_PLAN", p_PTVNIPL_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVELES", p_PTVNIPL_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL1", p_PTVNIPL_NIVEL1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL2", p_PTVNIPL_NIVEL2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL3", p_PTVNIPL_NIVEL3, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL4", p_PTVNIPL_NIVEL4, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL5", p_PTVNIPL_NIVEL5, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL6", p_PTVNIPL_NIVEL6, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL7", p_PTVNIPL_NIVEL7, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL8", p_PTVNIPL_NIVEL8, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_ESTADO_IND", p_PTVNIPL_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_INICIO", p_PTVNIPL_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVNIPL_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_FIN", p_PTVNIPL_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_USUA_ID", p_PTVNIPL_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_NivelPlanContable(ByVal p_PTVNIPL_CODE As String, ByVal p_PTVNIPL_CTLG_CODE As String, ByVal p_PTVNIPL_TIPL_CODE As String, ByVal p_PTVNIPL_NOMBRE_PLAN As String, ByVal p_PTVNIPL_NIVELES As Integer,
                                            ByVal p_PTVNIPL_NIVEL1 As Integer, ByVal p_PTVNIPL_NIVEL2 As Integer, ByVal p_PTVNIPL_NIVEL3 As Integer, ByVal p_PTVNIPL_NIVEL4 As Integer,
                                            ByVal p_PTVNIPL_NIVEL5 As Integer, ByVal p_PTVNIPL_NIVEL6 As Integer, ByVal p_PTVNIPL_NIVEL7 As Integer, ByVal p_PTVNIPL_NIVEL8 As Integer,
                                            ByVal p_PTVNIPL_ESTADO_IND As String, ByVal p_PTVNIPL_FECHA_INICIO As String, ByVal p_PTVNIPL_FECHA_FIN As String, ByVal p_PTVNIPL_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_NIVELES_PLAN_CONTABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CODE", p_PTVNIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_CTLG_CODE", p_PTVNIPL_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_TIPL_CODE", p_PTVNIPL_TIPL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NOMBRE_PLAN", p_PTVNIPL_NOMBRE_PLAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVELES", p_PTVNIPL_NIVELES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL1", p_PTVNIPL_NIVEL1, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL2", p_PTVNIPL_NIVEL2, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL3", p_PTVNIPL_NIVEL3, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL4", p_PTVNIPL_NIVEL4, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL5", p_PTVNIPL_NIVEL5, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL6", p_PTVNIPL_NIVEL6, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL7", p_PTVNIPL_NIVEL7, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_NIVEL8", p_PTVNIPL_NIVEL8, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_ESTADO_IND", p_PTVNIPL_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_INICIO", p_PTVNIPL_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVNIPL_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_FECHA_FIN", p_PTVNIPL_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVNIPL_USUA_ID", p_PTVNIPL_USUA_ID, ParameterDirection.Input, 253))
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
