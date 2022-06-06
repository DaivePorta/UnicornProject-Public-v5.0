Public Class FILineaCProveedores
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub


    Public Function CREAR_LINEA_CREDITO(ByVal p_PIDM As String, _
                                        ByVal p_LINEA_CREDITO As String, _
                                        ByVal p_PLAZO_MAXIMO As String, _
                                        ByVal p_ESTADO_IND As String, _
                                        ByVal p_USUA_ID As String, _
                                        Optional ByVal p_TIPO_IND As String = "P", _
                                        Optional ByVal p_mon As String = "", _
                                        Optional ByVal p_CTLG_CODE As String = "") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFV_CREAR_LINEA_CREDITO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LINEA_CREDITO", p_LINEA_CREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO_MAXIMO", p_PLAZO_MAXIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            If p_mon = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_MON", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_MON", p_mon, ParameterDirection.Input, 253))
            End If

            If p_CTLG_CODE = "" Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            End If

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ACTUALIZAR_LINEA_CREDITO(ByVal p_PIDM As String, _
                                             ByVal p_SEQ As String, _
                                             ByVal p_LINEA_CREDITO As String, _
                                             ByVal p_PLAZO_MAXIMO As String, _
                                             ByVal p_ESTADO_IND As String, _
                                             ByVal p_USUA_ID As String, _
                                             ByVal p_TIPO_IND As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFV_ACTUALIZAR_LINEA_CREDITO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SEQ", p_SEQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_LINEA_CREDITO", p_LINEA_CREDITO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO_MAXIMO", p_PLAZO_MAXIMO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function LISTAR_LINEA_CREDITO(ByVal p_CODE As String, _
                                         ByVal p_CODE_SUNAT As String, _
                                         ByVal p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFV_LISTAR_LINEA_CREDITO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_SUNAT", p_CODE_SUNAT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

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

    Public Function fListarLineaCredito(ByVal P_PIDM As String, ByVal p_CTLG_COD As String, Optional ByVal filter As String = "P", Optional ByVal p_ESTADO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTAR_LINCRED", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_COD", p_CTLG_COD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Filter", filter, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

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

    Public Function fActualizarEstado(ByVal p_PIDM As String, _
                                      ByVal p_SECUENCIA As String, _
                                      ByVal p_CTLG_CODE As String, _
                                      Optional ByVal p_TIPO_IND As String = "P") As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("SP_ACTLINCREDPROV_EST", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SECUENCIA", p_SECUENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "PK"
            Return msg

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function fObtenerSEQ(ByVal PIDM As String, _
                                ByVal p_CTLG_CODE As String, _
                                Optional ByVal p_TIPO_IND As String = "P") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_ObtenerSEQLINPro", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

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

    Public Function fListarLCREDPROVXEMP(ByVal p_CTLG_CODE As String, _
                                         Optional ByVal p_TIPO_IND As String = "P") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_ListarLCREDPROVXEMP", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_IND", p_TIPO_IND, ParameterDirection.Input, 253))

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

    Public Function fListarLINCRED_CLI(ByVal p_CTLG_CODE As String) As DataTable
        Try

            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_LISTARLINCREXCLI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

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
End Class
