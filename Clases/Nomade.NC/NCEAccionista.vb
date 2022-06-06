﻿Public Class NCEAccionista
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarAccionista(ByVal p_id As String, ByVal p_estado As String, ByVal p_empresa As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_ACCIONISTA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ID", p_id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG", p_empresa, ParameterDirection.Input, 253))

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

    Public Function ActualizarAccionista(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_participacion As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_ACCIONISTA", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fechai, ParameterDirection.Input, 253))
            If p_fechat = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_fechat, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTICIPACION", p_participacion, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"


            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearAccionista(ByVal p_pidm As String, ByVal p_fechai As String, ByVal p_fechat As String, ByVal p_empresa As String, ByVal p_activo As String, ByVal p_user As String, ByVal p_participacion As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_ACCIONISTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_INICIO", p_fechai, ParameterDirection.Input, 253))
            If p_fechat = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_FIN", p_fechat, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PARTICIPACION", p_participacion, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function EliminarAccionista(ByVal p_pidm As String, ByVal p_empresa As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ELIMINAR_ACCIONISTA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_pidm, ParameterDirection.Input, 253))
            
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
           
            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



End Class
